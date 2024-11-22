
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs5indOdx8o9mgkZhPTQ_U2btHSRSEJpE",
  authDomain: "ellafintess.firebaseapp.com",
  projectId: "ellafintess",
  storageBucket: "ellafintess.appspot.com",
  messagingSenderId: "725221543897",
  appId: "1:262431027750:ios:21fce4b390de60c06dece7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);