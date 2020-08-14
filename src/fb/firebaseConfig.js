import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBE1fdso1QM22JtfBqpjO9UGbrw8X1guYk",
  authDomain: "kokodarts-fb1f6.firebaseapp.com",
  databaseURL: "https://kokodarts-fb1f6.firebaseio.com",
  projectId: "kokodarts-fb1f6",
  storageBucket: "kokodarts-fb1f6.appspot.com",
  messagingSenderId: "2001487123",
  appId: "1:2001487123:web:47cd6b5dfdebfca09206e6",
  measurementId: "G-VZ9J000QRV",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
