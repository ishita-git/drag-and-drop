// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyD9GYM-hCQT_LdJ5uXytukKXDyWn69aYIY",
    authDomain: "drag-and-drop-page.firebaseapp.com",
    databaseURL: "https://drag-and-drop-page-default-rtdb.firebaseio.com",
    projectId: "drag-and-drop-page",
    storageBucket: "drag-and-drop-page.firebasestorage.app",
    messagingSenderId: "968368745684",
    appId: "1:968368745684:web:9f40ffec7f75e9bc3f1f41",
    measurementId: "G-2E08RVZ7M4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
