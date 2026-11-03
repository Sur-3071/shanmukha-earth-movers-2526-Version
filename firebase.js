// Firebase Realtime Database configuration.
// Replace every YOUR_* value with the values from Firebase Console > Project settings.
// Copy the exact Realtime Database URL from Firebase Console > Realtime Database.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsbhH9D-EHAkRu8_MHA8c46uIJvXtkvTs",
  authDomain: "form-359da.firebaseapp.com",
  databaseURL: "https://form-359da-default-rtdb.firebaseio.com",
  projectId: "form-359da",
  storageBucket: "form-359da.firebasestorage.app",
  messagingSenderId: "214530619278",
  appId: "1:214530619278:web:e25beac9d2c023443c96df"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, get, set };