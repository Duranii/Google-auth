import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3AhwpZi-JZioN8o4bxmBVln3wgcoPJm4",
  authDomain: "multi-shop-c4258.firebaseapp.com",
  projectId: "multi-shop-c4258",
  storageBucket: "multi-shop-c4258.appspot.com",
  messagingSenderId: "1039584859436",
  appId: "1:1039584859436:web:8f905ace2a679d53974889",
  measurementId: "G-HV10N2FPZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
export {auth,googleAuthProvider};