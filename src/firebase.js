import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0]; // Use the initialized app
}

const firebaseConfig = {
    apiKey: "AIzaSyDbSH12i-KpDQqYpqJXniiAD3fyU7drJAk",
    authDomain: "treetherium.firebaseapp.com",
    projectId: "treetherium",
    storageBucket: "treetherium.appspot.com",
    messagingSenderId: "447506327762",
    appId: "1:447506327762:web:8fae710b5a698cc18a250b"
  };

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
