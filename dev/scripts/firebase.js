import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB44EGFIcfwqhvhgN-5xG4xX9W17R1sWqc",
  authDomain: "fun-food-friends-7b9e6.firebaseapp.com",
  databaseURL: "https://fun-food-friends-7b9e6.firebaseio.com",
  projectId: "fun-food-friends-7b9e6",
  storageBucket: "fun-food-friends-7b9e6.appspot.com",
  messagingSenderId: "92522490777"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

