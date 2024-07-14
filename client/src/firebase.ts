// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kittynet-429309.firebaseapp.com",
  projectId: "kittynet-429309",
  storageBucket: "kittynet-429309.appspot.com",
  messagingSenderId: "493136898923",
  appId: "1:493136898923:web:3d4777394a9dd35c67fa2e",
  measurementId: "G-RCYDZKVBSV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);