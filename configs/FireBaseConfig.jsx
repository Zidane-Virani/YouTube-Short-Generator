// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "yt-short-generator-d6e06.firebaseapp.com",
  projectId: "yt-short-generator-d6e06",
  storageBucket: "yt-short-generator-d6e06.firebasestorage.app",
  messagingSenderId: "201428049620",
  appId: "1:201428049620:web:db5577f72fb73c9936e541",
  measurementId: "G-WTKGK4WSJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);