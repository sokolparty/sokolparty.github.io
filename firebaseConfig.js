// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_P1R1-PGfykAVM_Y9B6Ajz4ckkz1vz9Q",
  authDomain: "sokolparty420.firebaseapp.com",
  projectId: "sokolparty420",
  storageBucket: "sokolparty420.appspot.com",
  messagingSenderId: "361570196780",
  appId: "1:361570196780:web:e1e1e419d06d475355e089",
  measurementId: "G-18TK7X35TQ"
};

// Initialize Firebase
import const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
