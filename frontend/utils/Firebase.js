import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "loginonecart-ea2c9.firebaseapp.com",
  projectId: "loginonecart-ea2c9",
  storageBucket: "loginonecart-ea2c9.firebasestorage.app",
  messagingSenderId: "324310722895",
  appId: "1:324310722895:web:9dbc5c1cc512612db67d3a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();


export {auth , provider}
