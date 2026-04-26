import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3D6TkBRGUspG_tAjymoUyjl6q_R-98mM",
  authDomain: "email-password-firebase-b1d1e.firebaseapp.com",
  projectId: "email-password-firebase-b1d1e",
  storageBucket: "email-password-firebase-b1d1e.firebasestorage.app",
  messagingSenderId: "130063078703",
  appId: "1:130063078703:web:90991d9209c5d06d2a3dda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

