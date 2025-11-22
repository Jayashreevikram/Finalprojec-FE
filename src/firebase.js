import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCxfKz4KWhNjcvjda3SE_B7jCaSTyYEfW8",
  authDomain: "peerhubproject.firebaseapp.com",
  projectId: "peerhubproject",
  storageBucket: "peerhubproject.firebasestorage.app",
  messagingSenderId: "221717243582",
  appId: "1:221717243582:web:025bb4da8f9fb43fe2e0ef",
  measurementId: "G-M6YSRW5J1S"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
