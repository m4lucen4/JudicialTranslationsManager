import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "oojj-malaga.firebaseapp.com",
  projectId: "oojj-malaga",
  storageBucket: "oojj-malaga.appspot.com",
  messagingSenderId: "862505323499",
  appId: "1:862505323499:web:b9ef922008b0c366d927ae"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
