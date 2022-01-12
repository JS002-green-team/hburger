import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4DvGefPGFNlA9_O5gvqNiynhzEczrxYY",
  authDomain: "hburger-b4486.firebaseapp.com",
  projectId: "hburger-b4486",
  storageBucket: "hburger-b4486.appspot.com",
  messagingSenderId: "435916994852",
  appId: "1:435916994852:web:db104b3072a378ea659bb1",
  measurementId: "G-WJ6RF52EG3",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
