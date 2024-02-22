import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8hIK8FViMcHiyR02pDG90nWGjHbIp85s",
  authDomain: "splitwise-clone-72044.firebaseapp.com",
  projectId: "splitwise-clone-72044",
  storageBucket: "splitwise-clone-72044.appspot.com",
  messagingSenderId: "916762838556",
  appId: "1:916762838556:web:d7ae0e468036f21baa81d9",
  measurementId: "G-5X820JL8Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth
