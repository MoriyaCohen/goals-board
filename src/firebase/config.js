// firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// קונפיגורציית Firebase שלך
const firebaseConfig = {
  apiKey: "AIzaSyA8e23IibkAoYAVVe1DoZxAYkzwifUGlV4",
  authDomain: "leads-tracker-c2653.firebaseapp.com",
  projectId: "leads-tracker-c2653",
  storageBucket: "leads-tracker-c2653.appspot.com", 
  messagingSenderId: "1043377576274",
  appId: "1:1043377576274:web:2849f1c81fbf1fc66b428b",
  measurementId: "G-ZB0LK72C9H"
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);

// שימוש ב-Auth ו-Database
const auth = getAuth(app);
const db = getFirestore(app);

// ייצוא לשימוש בפרויקט
export { auth, db };
