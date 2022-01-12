import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3pfOYy7Z6IA2nGMB5dO6OIS07so-c80k",
  authDomain: "hburger-green.firebaseapp.com",
  projectId: "hburger-green",
  storageBucket: "hburger-green.appspot.com",
  messagingSenderId: "858043529706",
  appId: "1:858043529706:web:7e4e7fe69c329344c41a93",
  measurementId: "G-1ZYZS5ZSZ0"
};


const app = initializeApp(firebaseConfig);
getAnalytics(app);