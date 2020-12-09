import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDuqY2obJN-FxRJD5KG6cWL_YoB2J5qdsM",
  authDomain: "yt-login-signup-15296.firebaseapp.com",
  projectId: "yt-login-signup-15296",
  storageBucket: "yt-login-signup-15296.appspot.com",
  messagingSenderId: "333378412087",
  appId: "1:333378412087:web:870736fd800a1aa536a9b2",
  measurementId: "G-NJD4F3X5QB",
});

export const auth = app.auth();
export default app;
