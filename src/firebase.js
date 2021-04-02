import firebase from "firebase/app";
import firebaseDb from "firebase";
import firebaseAuth from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA6Mul8uUK4oH69wDwHUOI_oICLuWvQbGw",
  authDomain: "auth-development-e9342.firebaseapp.com",
  projectId: "auth-development-e9342",
  storageBucket: "auth-development-e9342.appspot.com",
  messagingSenderId: "101886011573",
  appId: "1:101886011573:web:e3c67ec2c6bef8ef7cb6fc",
});

export const auth = app.auth();
export const firebaseApp = firebaseAuth;
export default app;
