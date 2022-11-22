import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAyjrOSrLXj1E703uWoB7jjWb7XnHKyNQQ",
  authDomain: "todolist-b1568.firebaseapp.com",
  databaseURL:
    "https://todolist-b1568-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "todolist-b1568",
  storageBucket: "todolist-b1568.appspot.com",
  messagingSenderId: "583810785444",
  appId: "1:583810785444:web:acce07d9ea026a28664631",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
