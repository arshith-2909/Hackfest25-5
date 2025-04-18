// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCTvvpobpynMr7lnX8HaZWr0jvsW8FZHA4",
  authDomain: "pennywise-80aec.firebaseapp.com",
  projectId: "pennywise-80aec",
  storageBucket: "pennywise-80aec.firebasestorage.app",
  messagingSenderId: "341081203347",
  appId: "1:341081203347:web:fd597eedf95ada53aae366",
  measurementId: "G-YDY24S1NBY"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Init services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
