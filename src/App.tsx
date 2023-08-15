import React from 'react';
import './App.css';
import ChatBox from './Components/ChatBox';
import NavBar from './Components/NavBar';
import Welcome from './Components/Welcome';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <NavBar />
    {!user ? (
        <Welcome />
      ) : (
        <>
          <ChatBox />
        </>
      )
    }
    </div>
  );
}

export default App;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAOLpUjPzAng3N1q2RBxMYt9_PbHSHjJnM",
//   authDomain: "chatapp-30fc9.firebaseapp.com",
//   projectId: "chatapp-30fc9",
//   storageBucket: "chatapp-30fc9.appspot.com",
//   messagingSenderId: "1009579771672",
//   appId: "1:1009579771672:web:8a53a016ee31086c05006d",
//   measurementId: "G-CKL6MTFKBK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
