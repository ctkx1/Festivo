// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCoges0PyfFHfvYP9lBqygv-juS2weT_E",
  authDomain: "testauth-1f58f.firebaseapp.com",
  projectId: "testauth-1f58f",
  storageBucket: "testauth-1f58f.firebasestorage.app",
  messagingSenderId: "309354916048",
  appId: "1:309354916048:web:b5850f100df00869fd16d5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
