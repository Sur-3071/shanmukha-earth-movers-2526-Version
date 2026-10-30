FAMILY DEBT CLEARANCE TRACKER — FIREBASE REALTIME DATABASE VERSION

WHAT CHANGED
- Replaced Local Storage as the primary data store for debts and transactions with Firebase Realtime Database.
- Debt CRUD, contribution CRUD, debt payment records, and contribution-cycle start date now read/write under:
  DebtClearanceTracker/
- Existing dashboard, daily-prorated interest calculations, reports, CSV export, audit trail,
  insufficient-balance validation, loading animation, and theme preference are preserved.
- On first launch, if the Firebase root does not exist, the app attempts to migrate the old
  debtClearanceTracker.v4 / familyDebtTrackerV2 browser data into Firebase. Keep a CSV backup.
- Theme preference remains local to each browser. Financial records and cycle start date are in Firebase.

REQUIRED SETUP BEFORE TESTING
1. Open Firebase Console and select your Firebase project.
2. Open Project settings > General > Your apps. Register a Web App if you have not already.
3. Copy the web app config values into firebase.js:
   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId.
4. Open Build > Realtime Database and create/select your database.
5. Copy the exact Realtime Database URL shown in the console into the databaseURL field in firebase.js.
   The URL may use a regional hostname; do not assume the default URL shown in the template.
6. Configure Realtime Database rules for the access model you intend to use.
7. Serve this folder from localhost or a web host (for example VS Code Live Server). Do not open
   index.html directly using file:// because browser ES module imports may be blocked.
8. Open the site and wait for the status to say "Connected to Firebase Realtime Database".

DATABASE SHAPE
DebtClearanceTracker/
  debts/{debtId}
  transactions/{transactionId}
  settings/contributionStartDate
  updatedAt

IMPORTANT DATA / SECURITY NOTES
- This version intentionally has no login, as requested.
- If your Realtime Database rules allow public read/write, anyone who discovers the database URL
  can read, change, or delete the financial data. A public API key is not a security boundary.
  Do not store sensitive financial information in an openly writable database.
- This implementation writes the current debts and transactions snapshot to one root node after
  each change. It is suitable for a single-family tracker with one person making changes at a time.
  Simultaneous edits from multiple browsers can overwrite each other's latest snapshot.
- The existing localStorage records are not deleted by this version. First-time migration uploads
  them only when the Firebase root is empty. If Firebase already contains data, Firebase data wins.
- Export CSV before testing or migrating. Never use Reset all data unless you intend to clear the
  Firebase records for this tracker.

TROUBLESHOOTING
- "Firebase connection failed": verify firebase.js values and the exact databaseURL.
- Permission denied: check your Realtime Database rules.
- Module/CORS error: run through localhost or HTTPS hosting, not file://.
