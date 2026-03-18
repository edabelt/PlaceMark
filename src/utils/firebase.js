import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8m4KeL2KeZ97wsJ5oIHPoCmSTcl9W1y4",
  authDomain: "placemark-ae1ce.firebaseapp.com",
  projectId: "placemark-ae1ce",
  storageBucket: "placemark-ae1ce.firebasestorage.app",
  messagingSenderId: "953068667904",
  appId: "1:953068667904:web:b65bc29a89277f1d1f04e5",
  measurementId: "G-N4PKCX2LY5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);