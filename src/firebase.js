// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Add Storage

const firebaseConfig = {
  apiKey: "AIzaSyAQugv_LXPVCPsrT9HYtKelAMNw4JIaSXE",
  authDomain: "sacred-geomancy-solutions.firebaseapp.com",
  projectId: "sacred-geomancy-solutions",
  storageBucket: "sacred-geomancy-solutions.appspot.com", // ✅ FIXED
  messagingSenderId: "786454834793",
  appId: "1:786454834793:web:bbdce3cb9859b46d257cf8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Export Storage
