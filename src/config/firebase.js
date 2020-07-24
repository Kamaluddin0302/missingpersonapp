import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firebase-firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyC8J34VOAgFBJ-eFng1Gu2OtYusPbe5tQM",
  authDomain: "kotemounyo-40699.firebaseapp.com",
  databaseURL: "https://kotemounyo-40699.firebaseio.com",
  projectId: "kotemounyo-40699",
  storageBucket: "kotemounyo-40699.appspot.com",
  messagingSenderId: "922104978255",
  appId: "1:922104978255:web:ff496219fafbe06810833a",
  measurementId: "G-VB2E9VD08D",
};
// Initialize Firebase

// Initialize Firebase
let FirebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export { FirebaseApp };
