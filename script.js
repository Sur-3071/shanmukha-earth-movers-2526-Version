import { db, ref, get, set } from "./firebase.js";

const STORAGE_KEY = "debtClearanceTracker.v4";
const DEFAULT_CYCLE_START = "2026-12-15";
const TARGETS = { Dad: 45000, Me: 35000 };
const PEOPLE = ["Dad", "Me"];
const FIREBASE_ROOT = "DebtClearanceTracker";
let state = { debts: [], transactions: [], contributionStartDate: DEFAULT_CYCLE_START };
let modalAction = null;
let editingDebtId = null;
let editingContributionId = null;
let editingPaymentId = null;

function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`; }
function todayISO() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function localDate(iso) { if (!iso) return null; const [y,m,d] = iso.split("-").map(Number); return new Date(y,m-1,d); }
function dateISO(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
function daysBetween(startISO, endISO) { const a=localDate(startISO), b=localDate(endISO); return Math.max(0, Math.floor((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/86400000)); }
function money(value) { return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2,maximumFractionDigits:2}).format(Math.max(0, Number(value)||0)); }
function formatDate(iso) { const d=localDate(iso); return d ? d.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "—"; }
function monthKey(iso) { return iso.slice(0,7); }
// Contribution periods run from the configured start date to the day before
// the same day in the next month. Dates before the first start are not counted.
function getCycleStart() { return state.contributionStartDate || DEFAULT_CYCLE_START; }
function addMonthsFromISO(iso, count) {
 const [y,m,d]=iso.split("-").map(Number); const first=new Date(y,m-1+count,1);
 const last=new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
 return dateISO(new Date(first.getFullYear(),first.getMonth(),Math.min(d,last)));
}
function contributionCycleKey(iso) {
 const anchor=getCycleStart(); if(iso<anchor) return "";
 let [y,m]=anchor.split("-").map(Number); let n=(Number(iso.slice(0,4))-y)*12+(Number(iso.slice(5,7))-m);
 while(n>0 && iso<addMonthsFromISO(anchor,n)) n--;
 return addMonthsFromISO(anchor,n).slice(0,7);
}
function monthLabel(key) { const [y,m]=key.split("-").map(Number); return new Date(y,m-1,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"}); }
function readLegacyLocalState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { const parsed=JSON.parse(raw); if (Array.isArray(parsed.debts)&&Array.isArray(parsed.transactions)) return {debts:parsed.debts.map(normalizeDebt),transactions:parsed.transactions.map(normalizeTx)}; }
    const old = localStorage.getItem("familyDebtTrackerV2");
    if (old) { const parsed=JSON.parse(old); if(Array.isArray(parsed.debts)&&Array.isArray(parsed.transactions)) return {debts:[],transactions:parsed.transactions.map(normalizeTx)}; }
  } catch (e) { console.error("Could not read legacy browser data",e); }
  return null;
}
function asArray(value, normalizer) {
  if (Array.isArray(value)) return value.map(normalizer);
  if (value && typeof value === "object") return Object.values(value).map(normalizer);
  return [];
}
function asFirebaseMap(items) {
  const result = {};
  items.forEach(item => { result[String(item.id)] = item; });
  return result;
}
async function initializeData() {
  try {
    const snapshot = await get(ref(db, FIREBASE_ROOT));
    if (snapshot.exists()) {
      const remote = snapshot.val() || {};
      state = {
        debts: asArray(remote.debts, normalizeDebt),
        transactions: asArray(remote.transactions, normalizeTx),
        contributionStartDate: remote.settings?.contributionStartDate || DEFAULT_CYCLE_START
      };
    } else {
      const legacy = readLegacyLocalState();
      state = { debts: legacy?.debts || [], transactions: legacy?.transactions || [], contributionStartDate: localStorage.getItem("debtTracker.contributionStartDate") || DEFAULT_CYCLE_START };
      await saveState();
    }
    renderAll();
    document.getElementById("storageStatus").textContent = "Connected to Firebase Realtime Database";
    document.getElementById("storageStatus").classList.add("connected");
    document.getElementById("cycleDuePill").textContent = `Cycle starts on day ${Number(getCycleStart().slice(8,10))} each month`;
    document.getElementById("contributionStartDate").value = getCycleStart();
  } catch (error) {
    console.error("Firebase initialization failed", error);
    document.getElementById("storageStatus").textContent = "Firebase connection failed — check firebase.js configuration and database rules";
    showModal("Firebase connection failed", "The tracker could not connect to Firebase. Check firebase.js values, the Realtime Database URL, and your database rules. Your existing local browser data has not been deleted.");
  }
}
function normalizeDebt(d) { return {id:String(d.id ?? uid()),name:String(d.name||"Untitled debt"),original:Number(d.original ?? d.originalAmount ?? 0),rate:Number(d.rate ?? d.annualRate ?? 0),interestMode:"dailyPercent",startDate:d.startDate||todayISO(),purpose:String(d.purpose||""),items:String(d.items||d.expenses||""),notes:String(d.notes||"")}; }
function normalizeTx(tx) { return {id:String(tx.id??uid()),type:tx.type,amount:Number(tx.amount)||0,date:tx.date||todayISO(),person:tx.person||"",debtId:tx.debtId==null?"":String(tx.debtId),note:String(tx.note||"")}; }
async function saveState() {
  if (!db) throw new Error("Firebase database is not initialized");
  const payload = {
    debts: asFirebaseMap(state.debts),
    transactions: asFirebaseMap(state.transactions),
    settings: { contributionStartDate: getCycleStart() },
    updatedAt: new Date().toISOString()
  };
  await set(ref(db, FIREBASE_ROOT), payload);
  return true;
}
function showModal(title,message,action=null,confirm=false) { document.getElementById("modalTitle").textContent=title; document.getElementById("modalMessage").textContent=message; document.getElementById("modalCancel").classList.toggle("hidden",!confirm); document.getElementById("modalOK").textContent=confirm?"Confirm":"OK"; modalAction=action; document.getElementById("modalBackdrop").classList.remove("hidden"); }
function closeModal() { document.getElementById("modalBackdrop").classList.add("hidden"); modalAction=null; }
document.getElementById("modalOK").addEventListener("click",async()=>{const action=modalAction;closeModal();if(action){try{await action();}catch(error){console.error(error);showModal("Firebase save failed","Your change could not be saved to Firebase. Check your connection and database rules, then try again.");}}});
document.getElementById("modalCancel").addEventListener("click",closeModal);

function setView(viewId) { document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden")); document.getElementById(viewId).classList.remove("hidden"); document.querySelectorAll(".nav-button").forEach(b=>b.classList.toggle("active",b.dataset.view===viewId)); renderAll(); }
document.querySelectorAll(".nav-button").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
document.getElementById("dashboardCreateBtn").addEventListener("click",()=>setView("createDebtView"));

function getTotals() {
  const today=todayISO();
  // Financial snapshot uses all recorded transactions, including future-dated
  // contributions, so the displayed balance matches the full contribution report.
  // This is a recorded/projected balance, not cash physically available today.
  const contributions=state.transactions.filter(t=>t.type==="Contribution").reduce((s,t)=>s+(Number(t.amount)||0),0);
  const payments=state.transactions.filter(t=>t.type==="Payment").reduce((s,t)=>s+(Number(t.amount)||0),0);
  const outstanding=state.debts.reduce((s,d)=>s+debtSnapshot(d,today).total,0);
  return {contributions,payments,balance:contributions-payments,outstanding};
}
// Monthly interest is charged only after each completed anniversary period.
// Remaining days in an incomplete month do not accrue partial interest.
function addMonthsToDate(date, months=1) {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
}
function wholeDaysBetweenDates(a, b) {
  return Math.max(0, Math.floor((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000));
}
// Daily-prorated interest for every debt. The entered rate is the percentage
// charged over a 30-day period; elapsed days are prorated against that period.
// Interest is accrued on the outstanding principal between transactions.
function accrueDebtInterest(principal, debt, startISO, endISO) {
  if (!startISO || !endISO || startISO >= endISO || principal <= 0) return 0;
  const rate = Number(debt.rate) || 0;
  const elapsedDays = daysBetween(startISO, endISO);
  return principal * (rate / 100) / 30 * elapsedDays;
}
function monthDayDuration(startISO, endISO) {
  if (!startISO || !endISO || startISO > endISO) return { months: 0, remainingDays: 0, label: "0 months, 0 days" };
  let cursor = localDate(startISO);
  const end = localDate(endISO);
  let months = 0;
  while (addMonthsToDate(cursor, 1) <= end) {
    cursor = addMonthsToDate(cursor, 1);
    months++;
  }
  const remainingDays = wholeDaysBetweenDates(cursor, end);
  return { months, remainingDays, label: `${months} ${months === 1 ? "month" : "months"}, ${remainingDays} ${remainingDays === 1 ? "day" : "days"}` };
}
function debtSnapshot(debt, asOf=todayISO()) {
  const start=debt.startDate||todayISO();
  const rate=Number(debt.rate)||0;
  if (start>asOf) return {principal:debt.original,interest:0,dailyInterest:(Number(debt.original)||0)*rate/100/30,total:debt.original,days:0,duration:"0 months, 0 days"};
  let principal=Math.max(0,Number(debt.original)||0), interest=0, cursor=start;
  const payments=state.transactions.filter(t=>t.type==="Payment"&&String(t.debtId)===String(debt.id)&&t.date>=start&&t.date<=asOf).sort((a,b)=>a.date.localeCompare(b.date)||String(a.id).localeCompare(String(b.id)));
  for(const tx of payments) {
    interest += accrueDebtInterest(principal,debt,cursor,tx.date);
    let payment=tx.amount;
    const interestPaid=Math.min(interest,payment); interest-=interestPaid; payment-=interestPaid;
    principal=Math.max(0,principal-payment);
    cursor=tx.date;
  }
  interest += accrueDebtInterest(principal,debt,cursor,asOf);
  principal=Math.round(principal*100)/100; interest=Math.round(interest*100)/100;
  const dailyInterest=principal*rate/100/30;
  const duration=monthDayDuration(start,asOf).label;
  return {principal,interest,dailyInterest,total:Math.round((principal+interest)*100)/100,days:daysBetween(start,asOf),duration};
}
function debtLifecycle(debt, asOf=todayISO()) {
  const start=debt.startDate||todayISO();
  let principal=Math.max(0,Number(debt.original)||0), interestDue=0, interestAccrued=0, cursor=start, closedDate="", paidToDebt=0, principalPaid=0, interestPaidTotal=0;
  const payments=state.transactions.filter(t=>t.type==="Payment"&&String(t.debtId)===String(debt.id)&&t.date>=start&&t.date<=asOf).sort((a,b)=>a.date.localeCompare(b.date)||String(a.id).localeCompare(String(b.id)));
  for(const tx of payments) {
    const earned=accrueDebtInterest(principal,debt,cursor,tx.date);
    interestDue+=earned; interestAccrued+=earned;
    let payment=Number(tx.amount)||0; paidToDebt+=payment;
    const interestPaid=Math.min(interestDue,payment); interestDue-=interestPaid; payment-=interestPaid;
    interestPaidTotal+=interestPaid;
    const principalPayment=Math.min(principal,payment); principalPaid+=principalPayment;
    principal=Math.max(0,principal-principalPayment); cursor=tx.date;
    if(principal<=0.005 && interestDue<=0.005) { closedDate=tx.date; break; }
  }
  if(!closedDate) { const earned=accrueDebtInterest(principal,debt,cursor,asOf); interestDue+=earned; interestAccrued+=earned; }
  return {closedDate,interestAccrued:Math.round(interestAccrued*100)/100,paidToDebt:Math.round(paidToDebt*100)/100,principalPaid:Math.round(principalPaid*100)/100,interestPaid:Math.round(interestPaidTotal*100)/100,principal:Math.round(principal*100)/100,interestDue:Math.round(interestDue*100)/100,isClosed:Boolean(closedDate)};
}
function renderReportOverview() {
  const today=todayISO(), totals=getTotals();
  // Snapshot total mirrors the full monthly contribution report, including
  // future-dated contributions already recorded. Cash balance deliberately
  // remains based only on contributions whose dates have arrived.
  const allRecordedContributions=state.transactions
    .filter(t=>t.type==="Contribution")
    .reduce((sum,t)=>sum+(Number(t.amount)||0),0);
  let totalInterest=0, interestPaid=0, interestRemaining=0;
  let totalDebt=0, principalCleared=0, principalRemaining=0;
  state.debts.forEach(d=>{
    const life=debtLifecycle(d,today);
    totalDebt+=Number(d.original)||0;
    principalCleared+=life.principalPaid;
    principalRemaining+=life.principal;
    totalInterest+=life.interestAccrued;
    interestPaid+=life.interestPaid;
    interestRemaining+=life.interestDue;
  });
  // Keep the payment headline as the total of all recorded payments, including future-dated entries.
  const totalCleared=state.transactions.filter(t=>t.type==="Payment").reduce((sum,t)=>sum+(Number(t.amount)||0),0);
  document.getElementById("reportContributions").textContent=money(allRecordedContributions);
  document.getElementById("reportTotalDebt").textContent=money(totalDebt);
  document.getElementById("reportDebtCleared").textContent=money(principalCleared);
  document.getElementById("reportDebtRemaining").textContent=money(principalRemaining);
  document.getElementById("reportInterest").textContent=money(totalInterest);
  document.getElementById("reportInterestPaid").textContent=money(interestPaid);
  document.getElementById("reportInterestRemaining").textContent=money(interestRemaining);
  document.getElementById("reportCleared").textContent=money(totalCleared);
  document.getElementById("reportBalance").textContent=money(totals.balance);
  document.getElementById("reportAsOf").textContent=`Calculated as of ${formatDate(today)}`;
}
function renderAll() { renderReportOverview();renderDebtSelect();renderDebtCards();renderDebtReport();renderDebtPaymentHistory();renderMonthlyReport();renderHistory();document.getElementById("paymentAvailable").textContent=money(getTotals().balance); }
function renderDebtSelect() { const select=document.getElementById("paymentDebt"), prev=select.value;select.replaceChildren();state.debts.forEach(d=>{const snap=debtSnapshot(d,todayISO()),o=document.createElement("option");o.value=d.id;o.textContent=`${d.name} — ${money(snap.total)} outstanding`;o.disabled=snap.total<=0;select.appendChild(o);});if([...select.options].some(o=>o.value===prev&&!o.disabled))select.value=prev;updatePaymentLimit(); }
function updatePaymentLimit() { const d=state.debts.find(x=>String(x.id)===document.getElementById("paymentDebt").value),input=document.getElementById("paymentAmount");
 // Do not set a native max: it prevents the submit handler from running, so the
 // user would not see our insufficient-balance popup. Validate in the submit handler.
 input.removeAttribute("max");
 if(!d)return;
 }
document.getElementById("paymentDebt").addEventListener("change",updatePaymentLimit);

function renderDebtCards() {
 const grid=document.getElementById("debtGrid");grid.replaceChildren();document.getElementById("emptyDebts").classList.toggle("hidden",state.debts.length>0);
 state.debts.forEach(d=>{const s=debtSnapshot(d,todayISO()),card=document.createElement("article");card.className="debt-card";
 const head=document.createElement("div");head.className="debt-card-head";const title=document.createElement("div");const h=document.createElement("h3");h.textContent=d.name;const purpose=document.createElement("p");purpose.className="debt-purpose";purpose.textContent=d.purpose||"No purpose added";title.append(h,purpose);const badge=document.createElement("span");badge.className="status-pill"+(s.total<=0?" closed":"");badge.textContent=s.total<=0?"Cleared":"Active";head.append(title,badge);
 const total=document.createElement("div");total.className="debt-total";total.textContent=money(s.total);const sub=document.createElement("div");sub.className="muted";sub.textContent=`Total outstanding · as of ${formatDate(todayISO())}`;
 const details=document.createElement("div");details.className="detail-list";[["Original amount",money(d.original)],["Remaining principal",money(s.principal)],["Interest rate per 30 days",`${Number(d.rate).toLocaleString("en-IN")} %`],["Current daily interest",money(s.dailyInterest)],["Accrued interest",money(s.interest)],["Start date",formatDate(d.startDate)],["Days completed",String(s.days)],["Items / expenses",d.items||"—"],["Notes",d.notes||"—"]].forEach(([label,val])=>{const row=document.createElement("div");row.className="detail-row";const l=document.createElement("span"),v=document.createElement("strong");l.textContent=label;v.textContent=val;row.append(l,v);details.append(row);});
 const actions=document.createElement("div");actions.className="card-actions";const pay=document.createElement("button");pay.className="button primary";pay.textContent="Clear Debt";pay.disabled=s.total<=0;pay.addEventListener("click",()=>{setView("clearDebtView");document.getElementById("paymentDebt").value=d.id;updatePaymentLimit();});const edit=document.createElement("button");edit.className="button secondary";edit.textContent="Edit";edit.addEventListener("click",()=>editDebt(d.id));const del=document.createElement("button");del.className="button danger";del.textContent="Delete";del.addEventListener("click",()=>deleteDebt(d.id));actions.append(pay,edit,del);card.append(head,total,sub,details,actions);grid.append(card);
 });
}
function renderDebtReport() {
 const body=document.getElementById("debtReportBody");body.replaceChildren();
 if(!state.debts.length){const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=9;td.textContent="No debts added yet.";tr.append(td);body.append(tr);return;}
 state.debts.forEach(d=>{const s=debtSnapshot(d,todayISO()),tr=document.createElement("tr");[d.name,d.purpose||"—",money(s.principal),money(s.interest),money(s.dailyInterest),formatDate(d.startDate),String(s.days),s.duration,money(s.total)].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td);});body.append(tr);});
}

function renderDebtPaymentHistory() {
 const body=document.getElementById("debtPaymentBody"),foot=document.getElementById("debtPaymentFoot");
 body.replaceChildren();foot.replaceChildren();
 const payments=state.transactions.filter(t=>t.type==="Payment").sort((a,b)=>b.date.localeCompare(a.date)||String(b.id).localeCompare(String(a.id)));
 let total=0;
 if(!payments.length){const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=5;td.textContent="No debt payments recorded yet.";tr.append(td);body.append(tr);}
 payments.forEach(tx=>{
  const debt=state.debts.find(d=>String(d.id)===String(tx.debtId));
  const amount=Number(tx.amount)||0;total+=amount;
  const outstanding=debt?debtSnapshot(debt,tx.date).total:null;
  const status=outstanding===null?"Debt unavailable":outstanding<=0.005?"Fully cleared":"Partially paid";
  const tr=document.createElement("tr");
  [formatDate(tx.date),debt?.name||"Deleted debt",money(amount),status].forEach(value=>{const td=document.createElement("td");td.textContent=value;tr.append(td);});
  const actions=document.createElement("td");
  const edit=document.createElement("button");edit.type="button";edit.className="button secondary table-action";edit.textContent="Edit";edit.addEventListener("click",()=>editPayment(tx.id));
  const del=document.createElement("button");del.type="button";del.className="button danger table-action";del.textContent="Delete";del.addEventListener("click",()=>deletePayment(tx.id));
  actions.append(edit,del);tr.append(actions);body.append(tr);
 });
 const tr=document.createElement("tr");tr.className="grand-total-row";
 ["GRAND TOTAL","All debt payments",money(total),`${payments.length} payment${payments.length===1?"":"s"}`,"—"].forEach(value=>{const td=document.createElement("td");td.textContent=value;tr.append(td);});
 foot.append(tr);
}

function createMonthKeys() {
 const today=todayISO(), anchor=getCycleStart(); if(today<anchor) return [];
 const keys=[]; let n=0; while(true) { const start=addMonthsFromISO(anchor,n); if(start>today) break; keys.push(start.slice(0,7)); n++; if(n>2400) break; } return keys;
}
function buildMonthlyRows(person) {
 const contributions={};state.transactions.filter(t=>t.type==="Contribution"&&t.person===person).forEach(t=>{const k=contributionCycleKey(t.date);if(k) contributions[k]=(contributions[k]||0)+t.amount;});
 const keys=[...new Set([...createMonthKeys(),...Object.keys(contributions).filter(k=>k>=getCycleStart().slice(0,7))])].sort();let pending=0,carry=0;const rows=[];
 keys.forEach(key=>{const contributed=contributions[key]||0,target=TARGETS[person],previousPending=pending,carryIn=carry,available=contributed+carryIn;const pendingCleared=Math.min(previousPending,available);const afterArrears=Math.max(0,available-pendingCleared);const currentCovered=Math.min(target,afterArrears);const currentShortfall=Math.max(0,target-currentCovered);pending=Math.max(0,previousPending-pendingCleared)+currentShortfall;carry=Math.max(0,afterArrears-target);const carryUsed=Math.min(carryIn,Math.max(0,target-Math.max(0,contributed-(previousPending-pendingCleared))));rows.push({key,person,target,contributed,previousPending,pendingCleared,currentShortfall,carryUsed,finalPending:pending,remainingCarryForward:carry,status:pending<=0?"Complete":contributed>0?"Partial":"Pending"});});return rows;
}
function renderMonthlyReport() { renderPersonRows("Dad","dadMonthlyBody");renderPersonRows("Me","meMonthlyBody"); }
function renderPersonRows(person,bodyId) { const body=document.getElementById(bodyId);body.replaceChildren();const rows=buildMonthlyRows(person);const totals=rows.reduce((a,r)=>{a.target+=r.target;a.contributed+=r.contributed;a.previousPending+=r.previousPending;a.pendingCleared+=r.pendingCleared;a.shortfall+=r.currentShortfall;a.carryUsed+=r.carryUsed;a.finalPending=r.finalPending;a.carry=r.remainingCarryForward;return a;},{target:0,contributed:0,previousPending:0,pendingCleared:0,shortfall:0,carryUsed:0,finalPending:0,carry:0});if(!rows.length){const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=10;td.textContent="Monthly tracking starts on the selected contribution start date.";tr.append(td);body.append(tr);}else rows.forEach(r=>{const tr=document.createElement("tr");[monthLabel(r.key),money(r.target),money(r.contributed),money(r.previousPending),money(r.pendingCleared),money(r.currentShortfall),money(r.carryUsed),money(r.finalPending),money(r.remainingCarryForward),r.status].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td);});body.append(tr);});const foot=document.getElementById(person==="Dad"?"dadMonthlyFoot":"meMonthlyFoot");foot.replaceChildren();const tr=document.createElement("tr");tr.className="grand-total-row";["GRAND TOTAL",money(totals.target),money(totals.contributed),money(totals.previousPending),money(totals.pendingCleared),money(totals.shortfall),money(totals.carryUsed),money(totals.finalPending),money(totals.carry),"—"].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td);});foot.append(tr); }
function renderHistory() {
 const body=document.getElementById("historyBody");body.replaceChildren();
 const txs=[...state.transactions].sort((a,b)=>b.date.localeCompare(a.date)||String(b.id).localeCompare(String(a.id)));
 let contributions=0,payments=0;
 if(!txs.length){const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=6;td.textContent="No transactions recorded yet.";tr.append(td);body.append(tr);}
 else txs.forEach(t=>{
  const debt=state.debts.find(d=>String(d.id)===String(t.debtId));
  if(t.type==="Contribution")contributions+=Number(t.amount)||0;
  if(t.type==="Payment")payments+=Number(t.amount)||0;
  const tr=document.createElement("tr");
  [formatDate(t.date),t.type,t.type==="Contribution"?t.person:(debt?.name||"Deleted debt"),money(t.amount),t.note||"—"].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td);});
  const actions=document.createElement("td");
  if(t.type==="Contribution"){
   const edit=document.createElement("button");edit.type="button";edit.className="button secondary table-action";edit.textContent="Edit";edit.addEventListener("click",()=>editContribution(t.id));
   const del=document.createElement("button");del.type="button";del.className="button danger table-action";del.textContent="Delete";del.addEventListener("click",()=>deleteContribution(t.id));
   actions.append(edit,del);
  } else {
   const edit=document.createElement("button");edit.type="button";edit.className="button secondary table-action";edit.textContent="Edit";edit.addEventListener("click",()=>editPayment(t.id));
   const del=document.createElement("button");del.type="button";del.className="button danger table-action";del.textContent="Delete";del.addEventListener("click",()=>deletePayment(t.id));
   actions.append(edit,del);
  }
  tr.append(actions);body.append(tr);
 });
 const foot=document.getElementById("historyFoot");foot.replaceChildren();const tr=document.createElement("tr");tr.className="grand-total-row";
 ["GRAND TOTAL","—","Contributions / Payments",money(contributions),`Net cash: ${money(contributions-payments)} · Payments: ${money(payments)}`,"—"].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td);});foot.append(tr);
}

// Center-screen processing overlay for all transaction submissions.
function wait(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)); }
function setProcessingState(success, title, message) {
  const backdrop=document.getElementById("processingBackdrop");
  const spinner=document.getElementById("processingSpinner");
  const successIcon=document.getElementById("processingSuccessIcon");
  const bar=document.getElementById("processingProgressBar");
  document.getElementById("processingTitle").textContent=title;
  document.getElementById("processingMessage").textContent=message;
  spinner.classList.toggle("hidden",success); successIcon.classList.toggle("hidden",!success);
  backdrop.classList.toggle("is-complete",success); bar.classList.toggle("complete",success);
  backdrop.classList.remove("hidden");
}
async function runWithButtonFeedback(button, successText, action) {
  const originalHTML=button?.innerHTML||"";
  if(button) { button.disabled=true; button.setAttribute("aria-busy","true"); }
  setProcessingState(false,"Processing transaction","Please wait while we save your changes. Do not close this page.");
  await wait(650); // give the browser time to paint the centered loading animation
  let succeeded=false;
  try { succeeded=await action()!==false; }
  catch(error) { console.error(error); succeeded=false; }
  if(succeeded) {
    setProcessingState(true,successText,"Your transaction has been saved successfully.");
    await wait(1050);
  } else {
    document.getElementById("processingBackdrop").classList.add("hidden");
    showModal("Unable to complete","The transaction could not be saved. Please check your details and try again.");
  }
  document.getElementById("processingBackdrop").classList.add("hidden");
  if(button) { button.innerHTML=originalHTML; button.disabled=false; button.removeAttribute("aria-busy"); }
  return succeeded;
}

// Debt creation
 document.getElementById("debtStartDate").value=todayISO();document.getElementById("contributionDate").value=todayISO();document.getElementById("paymentDate").value=todayISO();
document.getElementById("debtForm").addEventListener("submit",async e=>{
 e.preventDefault();
 const form=e.currentTarget;
 const debt={id:editingDebtId||uid(),name:document.getElementById("debtName").value.trim(),original:Number(document.getElementById("debtAmount").value),rate:Number(document.getElementById("debtRate").value),interestMode:document.getElementById("debtInterestMode").value,startDate:document.getElementById("debtStartDate").value,purpose:document.getElementById("debtPurpose").value.trim(),items:document.getElementById("debtItems").value.trim(),notes:document.getElementById("debtNotes").value.trim()};
 if(!debt.name||!(debt.original>0)||!Number.isFinite(debt.rate)||debt.rate<0||!debt.startDate){showModal("Check details","Enter a debt name, valid principal, non-negative interest rate per 30 days and start date.");return;}
 if(debt.startDate>todayISO()){showModal("Invalid start date","Debt start date cannot be in the future.");return;}
 const button=e.submitter||form.querySelector('button[type="submit"]');
 const isEdit=Boolean(editingDebtId), previousIndex=state.debts.findIndex(d=>String(d.id)===String(editingDebtId)), previous=previousIndex>=0?{...state.debts[previousIndex]}:null;
 if(isEdit && state.transactions.some(t=>t.type==="Payment"&&String(t.debtId)===String(editingDebtId)&&t.date<debt.startDate)){showModal("Start date conflict","Debt start date cannot be later than an existing payment date.");return;}
 const ok=await runWithButtonFeedback(button,isEdit?"Debt updated":"Debt saved",async()=>{if(isEdit&&previousIndex>=0)state.debts[previousIndex]=debt;else state.debts.push(debt);try{await saveState();}catch(error){if(isEdit&&previous)state.debts[previousIndex]=previous;else state.debts.pop();throw error;}resetDebtForm();renderAll();return true;});
 if(ok){setView("dashboardView");}
});
function editDebt(id) {
 const d=state.debts.find(x=>String(x.id)===String(id));if(!d)return;
 editingDebtId=d.id;
 document.getElementById("debtName").value=d.name;
 document.getElementById("debtAmount").value=d.original;
 document.getElementById("debtInterestMode").value="dailyPercent";
 document.getElementById("debtRate").value=d.rate;
 updateInterestRateLabel();
 document.getElementById("debtStartDate").value=d.startDate;
 document.getElementById("debtPurpose").value=d.purpose||"";
 document.getElementById("debtItems").value=d.items||"";
 document.getElementById("debtNotes").value=d.notes||"";
 document.getElementById("debtSubmitButton").textContent="Update Debt";
 document.getElementById("cancelDebtEdit").classList.remove("hidden");
 setView("createDebtView");
 document.getElementById("debtName").focus();
}
function resetDebtForm(){editingDebtId=null;const form=document.getElementById("debtForm");form.reset();document.getElementById("debtStartDate").value=todayISO();document.getElementById("debtSubmitButton").textContent="Save Debt";document.getElementById("cancelDebtEdit").classList.add("hidden");updateInterestRateLabel();}
document.getElementById("cancelDebtEdit").addEventListener("click",resetDebtForm);
function updateInterestRateLabel(){document.getElementById("debtRateLabel").textContent="Interest rate per 30 days (%)";document.getElementById("debtRate").placeholder="2";}
document.getElementById("debtInterestMode").addEventListener("change",updateInterestRateLabel);
function deleteDebt(id) {const d=state.debts.find(x=>String(x.id)===String(id));if(!d)return;showModal("Delete debt?",`Delete “${d.name}”? Its payment history will remain in transaction history, but this debt will be removed from reports.`,async()=>{const previous=state.debts;state.debts=state.debts.filter(x=>String(x.id)!==String(id));try{await saveState();renderAll();}catch(error){state.debts=previous;throw error;}},true);}

// Contributions and repayments
function resetContributionForm(){
 editingContributionId=null;
 document.getElementById("contributionForm").reset();
 document.getElementById("contributionDate").value=todayISO();
 document.getElementById("contributionSubmitButton").textContent="Save Contribution";
 document.getElementById("cancelContributionEdit").classList.add("hidden");
}
function editContribution(id){
 const tx=state.transactions.find(t=>String(t.id)===String(id)&&t.type==="Contribution");if(!tx)return;
 editingContributionId=String(tx.id);
 document.getElementById("contributor").value=tx.person||"Dad";
 document.getElementById("contributionAmount").value=tx.amount;
 document.getElementById("contributionDate").value=tx.date;
 document.getElementById("contributionNote").value=tx.note||"";
 document.getElementById("contributionSubmitButton").textContent="Update Contribution";
 document.getElementById("cancelContributionEdit").classList.remove("hidden");
 setView("contributionView");
 window.scrollTo({top:0,behavior:"smooth"});
}
function deleteContribution(id){
 const tx=state.transactions.find(t=>String(t.id)===String(id)&&t.type==="Contribution");if(!tx)return;
 showModal("Delete contribution?",`Are you sure you want to delete the ${money(tx.amount)} contribution from ${tx.person} dated ${formatDate(tx.date)}? This will update your available balance and contribution reports.`,async()=>{
  const previous=state.transactions;state.transactions=state.transactions.filter(t=>String(t.id)!==String(id));
  try{await saveState();renderAll();}catch(error){state.transactions=previous;throw error;}
 },true);
}
document.getElementById("cancelContributionEdit").addEventListener("click",resetContributionForm);
document.getElementById("contributionForm").addEventListener("submit",async e=>{
 e.preventDefault();const form=e.currentTarget;
 const isEdit=Boolean(editingContributionId);
 const tx={id:editingContributionId||uid(),type:"Contribution",person:document.getElementById("contributor").value,amount:Number(document.getElementById("contributionAmount").value),date:document.getElementById("contributionDate").value,note:document.getElementById("contributionNote").value.trim()};
 if(!(tx.amount>0)||!Number.isFinite(tx.amount)||!tx.date){showModal("Invalid contribution","Enter a positive amount and a valid contribution date. Future-dated contributions are allowed.");return;}
 const index=isEdit?state.transactions.findIndex(t=>String(t.id)===String(editingContributionId)):-1;
 if(isEdit&&index<0){showModal("Contribution not found","This contribution no longer exists. Refresh the report and try again.");resetContributionForm();return;}
 const previous=isEdit?{...state.transactions[index]}:null;
 const button=e.submitter||document.getElementById("contributionSubmitButton");
 await runWithButtonFeedback(button,isEdit?"Contribution updated":"Contribution saved",async()=>{
  if(isEdit)state.transactions[index]=tx;else state.transactions.push(tx);
  try{await saveState();}catch(error){if(isEdit)state.transactions[index]=previous;else state.transactions.pop();throw error;}
  resetContributionForm();renderAll();return true;
 });
});
function resetPaymentForm(){
 editingPaymentId=null;
 const form=document.getElementById("paymentForm");form.reset();
 document.getElementById("paymentDate").value=todayISO();
 document.getElementById("paymentSubmitButton").textContent="Confirm Debt Payment";
 document.getElementById("cancelPaymentEdit").classList.add("hidden");
 renderDebtSelect();
}
function editPayment(id){
 const tx=state.transactions.find(t=>String(t.id)===String(id)&&t.type==="Payment");if(!tx)return;
 const debt=state.debts.find(d=>String(d.id)===String(tx.debtId));
 if(!debt){showModal("Debt unavailable","This payment is linked to a debt that no longer exists. You can delete this payment, but it cannot be edited until the debt is restored.");return;}
 editingPaymentId=String(tx.id);
 renderDebtSelect();
 const select=document.getElementById("paymentDebt");
 if(![...select.options].some(o=>o.value===String(debt.id))){const option=document.createElement("option");option.value=debt.id;option.textContent=`${debt.name} — existing payment`;select.append(option);}
 select.value=String(debt.id);
 document.getElementById("paymentAmount").value=tx.amount;
 document.getElementById("paymentDate").value=tx.date;
 document.getElementById("paymentNote").value=tx.note||"";
 document.getElementById("paymentSubmitButton").textContent="Update Debt Payment";
 document.getElementById("cancelPaymentEdit").classList.remove("hidden");
 setView("clearDebtView");
 window.scrollTo({top:0,behavior:"smooth"});
}
function deletePayment(id){
 const tx=state.transactions.find(t=>String(t.id)===String(id)&&t.type==="Payment");if(!tx)return;
 const debt=state.debts.find(d=>String(d.id)===String(tx.debtId));
 showModal("Delete debt payment?",`Are you sure you want to delete the ${money(tx.amount)} payment${debt?` for ${debt.name}`:""} dated ${formatDate(tx.date)}? This will recalculate debt balances, interest, reports and available cash.`,async()=>{
  const previous=state.transactions;state.transactions=state.transactions.filter(t=>String(t.id)!==String(id));
  try{await saveState();renderAll();}catch(error){state.transactions=previous;throw error;}
 },true);
}
document.getElementById("cancelPaymentEdit").addEventListener("click",resetPaymentForm);

document.getElementById("paymentForm").addEventListener("submit",async e=>{
 e.preventDefault();const form=e.currentTarget;
 const isEdit=Boolean(editingPaymentId);
 const oldIndex=isEdit?state.transactions.findIndex(t=>String(t.id)===String(editingPaymentId)&&t.type==="Payment"):-1;
 if(isEdit&&oldIndex<0){showModal("Payment not found","This debt payment no longer exists. Refresh the report and try again.");resetPaymentForm();return;}
 const oldTx=isEdit?{...state.transactions[oldIndex]}:null;
 const debt=state.debts.find(d=>String(d.id)===document.getElementById("paymentDebt").value);
 const amount=Number(document.getElementById("paymentAmount").value),date=document.getElementById("paymentDate").value;
 const available=getTotals().balance+(isEdit?(Number(oldTx.amount)||0):0);
 if(!debt){showModal("Select a debt","Create or select a debt before recording a payment.");return;}
 if(!(amount>0)||!Number.isFinite(amount)||!date||date>todayISO()){showModal("Invalid payment","Enter a positive payment and a date that is today or earlier.");return;}
 if(date<debt.startDate){showModal("Invalid payment date","Payment date cannot be before the debt start date.");return;}
 if(amount>available+0.001){showModal("No available balance",`You cannot make this payment because it is higher than your available balance. Available balance excluding the payment being edited: ${money(available)}.`);return;}
 // Calculate the selected debt's outstanding amount without the old version of this payment.
 let snapshot;
 if(isEdit){const current=state.transactions;state.transactions=current.filter(t=>String(t.id)!==String(editingPaymentId));snapshot=debtSnapshot(debt,date);state.transactions=current;}
 else snapshot=debtSnapshot(debt,date);
 if(amount>snapshot.total+0.001){showModal("Payment too high",`Outstanding amount on ${formatDate(date)} before this payment is ${money(snapshot.total)}.`);return;}
 const tx={id:isEdit?editingPaymentId:uid(),type:"Payment",debtId:debt.id,amount,date,note:document.getElementById("paymentNote").value.trim()};
 const button=e.submitter||document.getElementById("paymentSubmitButton");
 await runWithButtonFeedback(button,isEdit?"Debt payment updated":"Payment saved",async()=>{
  if(isEdit)state.transactions[oldIndex]=tx;else state.transactions.push(tx);
  try{await saveState();}catch(error){if(isEdit)state.transactions[oldIndex]=oldTx;else state.transactions.pop();throw error;}
  resetPaymentForm();renderAll();return true;
 });
});

// Report-page bulk reset controls. Each action clears only its own record category.
async function applyBulkReset(label, mutate){
 const previous={debts:state.debts,transactions:state.transactions,contributionStartDate:state.contributionStartDate};
 mutate();
 try{await saveState();resetContributionForm();resetPaymentForm();renderAll();showModal("Records updated",label);}
 catch(error){state.debts=previous.debts;state.transactions=previous.transactions;state.contributionStartDate=previous.contributionStartDate;throw error;}
}
document.getElementById("resetDebtsBtn").addEventListener("click",()=>{
 showModal("Reset all created debts?","This permanently deletes all debt records from Firebase. Contribution history and debt cleared/payment history will be kept as separate historical records (payments for removed debts will display as Deleted debt). Are you sure you want to proceed?",()=>applyBulkReset("All created debt records have been removed. Contribution history and debt payment history were kept.",()=>{state.debts=[];}),true);
});
document.getElementById("resetContributionsBtn").addEventListener("click",()=>{
 showModal("Reset all contribution history?","This permanently deletes only contribution records from Firebase. Created debts and debt cleared/payment history will be kept. Your available balance may change. Are you sure?",()=>applyBulkReset("All contribution history has been removed. Created debts and debt payment history were kept.",()=>{state.transactions=state.transactions.filter(t=>t.type!=="Contribution");}),true);
});
document.getElementById("resetPaymentsBtn").addEventListener("click",()=>{
 showModal("Reset debt cleared history?","This permanently deletes only debt payment/cleared-history records from Firebase. Created debts and contribution history will be kept. Debt balances and interest reports will be recalculated. Are you sure?",()=>applyBulkReset("All debt cleared/payment history has been removed. Created debts and contribution history were kept.",()=>{state.transactions=state.transactions.filter(t=>t.type!=="Payment");}),true);
});

function csvEscape(v){return `"${String(v??"").replace(/"/g,'""')}"`;}
document.getElementById("exportBtn").addEventListener("click",()=>{const rows=[["Debt","Purpose","Principal","Accrued Interest","Interest Mode / Daily Interest","Debt Start Date","Total Days","Months + Days","Total Outstanding"]];state.debts.forEach(d=>{const s=debtSnapshot(d,todayISO());rows.push([d.name,d.purpose,s.principal.toFixed(2),s.interest.toFixed(2),`Daily prorated rate ${Number(d.rate).toFixed(2)}% / 30 days; ${s.dailyInterest.toFixed(4)} per day`,d.startDate,s.days,s.duration,s.total.toFixed(2)]);});rows.push([], ["Transaction Date","Type","Person / Debt","Amount","Details"]);state.transactions.forEach(t=>{const d=state.debts.find(x=>String(x.id)===String(t.debtId));rows.push([t.date,t.type,t.type==="Contribution"?t.person:(d?.name||"Deleted debt"),t.amount.toFixed(2),t.note]);});const csv=rows.map(row=>row.map(csvEscape).join(",")).join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`debt-tracker-${todayISO()}.csv`;a.click();URL.revokeObjectURL(url);});

// Contribution-cycle start date is configurable and saved separately from debt data.
const cycleStartInput=document.getElementById("contributionStartDate");
cycleStartInput.value=getCycleStart();
document.getElementById("cycleDuePill").textContent=`Cycle starts on day ${Number(getCycleStart().slice(8,10))} each month`;
document.getElementById("saveCycleStart").addEventListener("click",()=>{
 const value=cycleStartInput.value;
 if(!value){showModal("Start date required","Choose a contribution tracking start date.");return;}
 if(value>todayISO()){showModal("Invalid start date","Contribution tracking start date cannot be in the future.");return;}
 const previousCycleStart=state.contributionStartDate;state.contributionStartDate=value;saveState().then(()=>{document.getElementById("cycleDuePill").textContent=`Cycle starts on day ${Number(value.slice(8,10))} each month`;renderMonthlyReport();showModal("Start date updated","Contribution cycles will now be calculated from the selected date. Existing contributions before this date will not be included.");}).catch(error=>{state.contributionStartDate=previousCycleStart;console.error(error);showModal("Firebase save failed","Could not save the contribution start date. Check your connection and database rules.");});
});
// Light/dark theme preference.
const themeToggle=document.getElementById("themeToggle");
function applyTheme(theme){document.body.dataset.theme=theme;themeToggle.textContent=theme==="dark"?"☀️ Light mode":"🌙 Dark mode";localStorage.setItem("debtTracker.theme",theme);}
applyTheme(localStorage.getItem("debtTracker.theme")||"light");
themeToggle.addEventListener("click",()=>applyTheme(document.body.dataset.theme==="dark"?"light":"dark"));
initializeData();
