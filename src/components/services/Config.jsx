import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.firebase_api_key,
  authDomain: "postpilot-d5f8f.firebaseapp.com",
  projectId: "postpilot-d5f8f",
  storageBucket: "postpilot-d5f8f.firebasestorage.app",
  messagingSenderId: "379152532066",
  appId: process.env.firebase_appID,
  measurementId: "G-26M88FNVFK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, app, db };
