import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,   // 👈 must start with VITE_
  authDomain: "authecom-68dc6.firebaseapp.com",
  projectId: "authecom-68dc6",
  storageBucket: "authecom-68dc6.appspot.com", // 👈 fix .app to .appspot.com
  messagingSenderId: "521675937116",
  appId: "1:521675937116:web:02c1adfc58c3f82cf99d99",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
