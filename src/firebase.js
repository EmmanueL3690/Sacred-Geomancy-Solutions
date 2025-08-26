import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQugv_LXPVCPsrT9HYtKelAMNw4JIaSXE",
  authDomain: "sacred-geomancy-solutions.firebaseapp.com",
  projectId: "sacred-geomancy-solutions",
  storageBucket: "sacred-geomancy-solutions.firebasestorage.app",
  messagingSenderId: "786454834793",
  appId: "1:786454834793:web:bbdce3cb9859b46d257cf8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
