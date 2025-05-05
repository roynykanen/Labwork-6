// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkJEOOKaSHwWJeMZyKb4cZfLcteRoAXjk",
  authDomain: "labwork-6-da541.firebaseapp.com",
  projectId: "labwork-6-da541",
  storageBucket: "labwork-6-da541.firebasestorage.app",
  messagingSenderId: "983418828759",
  appId: "1:983418828759:web:0f15be99a7f848c9fd3d92",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
