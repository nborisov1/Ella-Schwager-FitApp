// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs5indOdx8o9mgkZhPTQ_U2btHSRSEJpE",
  authDomain: "ellafintess.firebaseapp.com",
  projectId: "ellafintess",
  storageBucket: "ellafintess.appspot.com",
  messagingSenderId: "725221543897",
  appId: "1:262431027750:ios:21fce4b390de60c06dece7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);