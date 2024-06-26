// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJfTq7B-ZX6hWuJU8n_ybNaYicsdWXFus',
  authDomain: 'food-recipe-c28cc.firebaseapp.com',
  projectId: 'food-recipe-c28cc',
  storageBucket: 'food-recipe-c28cc.appspot.com',
  messagingSenderId: '63982940809',
  appId: '1:63982940809:web:c2547339c8b2a4abb60c58',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
