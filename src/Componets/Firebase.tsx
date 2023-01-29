import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVD0OGAv3e9M_Kq38KlpQnRJhje7pVDe4",
  authDomain: "val-app-e6f42.firebaseapp.com",
  projectId: "val-app-e6f42",
  storageBucket: "val-app-e6f42.appspot.com",
  messagingSenderId: "766255806449",
  appId: "1:766255806449:web:713651b20f9bd8d82df650"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()