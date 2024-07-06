// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-cloud-run-cloud-build.firebaseapp.com",
  projectId: "mern-cloud-run-cloud-build",
  storageBucket: "mern-cloud-run-cloud-build.appspot.com",
  messagingSenderId: "295793941263",
  appId: "1:295793941263:web:15da3b921a26615ba2bc7a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);