// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoqDFhd76LlPSuztXTLgBgLiD7Ib7rkXc",
  authDomain: "miniblog-34bc6.firebaseapp.com",
  projectId: "miniblog-34bc6",
  storageBucket: "miniblog-34bc6.appspot.com",
  messagingSenderId: "751008051844",
  appId: "1:751008051844:web:53475d29604881d69e88d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
