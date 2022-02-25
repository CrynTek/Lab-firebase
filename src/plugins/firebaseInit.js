// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBTCqn2TLzdrdEyMAnaHdijcgysSBb6Hm0",
  authDomain: "lab-fires-cloude.firebaseapp.com",
  projectId: "lab-fires-cloude",
  storageBucket: "lab-fires-cloude.appspot.com",
  messagingSenderId: "1084389915837",
  appId: "1:1084389915837:web:acae9c6555bc9b052d4bd4",
  measurementId: "G-S85HMKZ1LL"
});

const db = getFirestore(firebaseApp);
export default db;