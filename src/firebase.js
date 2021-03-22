import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyCzmMl4SzUWvaG5sukLwUFLz-2LXA5AjSc",
  authDomain: "react-login-signup-dfae3.firebaseapp.com",
  databaseURL: "https://react-login-signup-dfae3.firebaseio.com",
  projectId: "react-login-signup-dfae3",
  storageBucket: "react-login-signup-dfae3.appspot.com",
  messagingSenderId: "558413134085",
  appId: "1:558413134085:web:0d3aa13d7733b6c2139f6c"
  };
  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();