import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBWUX6aisU9vpJpbcLeDBQIgtE_nZ0nDcM",
    authDomain: "cc-final-proj-27579.firebaseapp.com",
    projectId: "cc-final-proj-27579",
    storageBucket: "cc-final-proj-27579.appspot.com",
    messagingSenderId: "75559476053",
    appId: "1:75559476053:web:b63afd59e8f0168c4caddc"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();