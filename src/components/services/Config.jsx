import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8fZiMTQcZnt7Y-RsQeZsNlALXLP41crc",
  authDomain: "postpilot-d5f8f.firebaseapp.com",
  projectId: "postpilot-d5f8f",
  storageBucket: "postpilot-d5f8f.firebasestorage.app",
  messagingSenderId: "379152532066",
  appId: "1:379152532066:web:77cc0ae935a64b1db7073b",
  measurementId: "G-26M88FNVFK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, app, db };
