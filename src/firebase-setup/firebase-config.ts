// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

interface IFirebaseConfiguration {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: IFirebaseConfiguration = {
  apiKey: process.env.REACT_APP_API_KEY ?? "",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN ?? "",
  projectId: process.env.REACT_APP_PROJECT_ID ?? "",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.REACT_APP_SENDER_ID ?? "",
  appId: process.env.REACT_APP_APP_ID ?? "",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID ?? "",
};

export const uiConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);
export const db = getFirestore(app);
