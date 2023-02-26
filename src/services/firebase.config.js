
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBJqsnHBnOr1eHKxZ--sk9tirTHrWbQkp8",
    authDomain: "fir-demo-6c1a4.firebaseapp.com",
    projectId: "fir-demo-6c1a4",
    storageBucket: "fir-demo-6c1a4.appspot.com",
    messagingSenderId: "1060591073874",
    appId: "1:1060591073874:web:696082b2abc58dba10bd8b",
    measurementId: "G-QTN2DFXV2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();