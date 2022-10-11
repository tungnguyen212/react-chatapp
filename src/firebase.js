// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAuGOTFWL6iKhfv4eC9wPeOzdc907U24HQ',
  authDomain: 'chat-1e6cf.firebaseapp.com',
  projectId: 'chat-1e6cf',
  storageBucket: 'chat-1e6cf.appspot.com',
  messagingSenderId: '495128489819',
  appId: '1:495128489819:web:96451fcc704b0bbc97b47e',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const chatdb = getFirestore();
