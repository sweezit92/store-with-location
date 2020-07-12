import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyDHfWybiovYnBy1VRxw7GS3i0G1_lS33AE",
    authDomain: "storelocation-14506.firebaseapp.com",
    databaseURL: "https://storelocation-14506.firebaseio.com",
    projectId: "storelocation-14506",
    storageBucket: "storelocation-14506.appspot.com",
    messagingSenderId: "85271425741",
    appId: "1:85271425741:web:d4ed290bc6b37066ebef84",
    measurementId: "G-ZH5HYJ8JEZ"
};

firebase.initializeApp(config);
firebase.firestore()

export default firebase 