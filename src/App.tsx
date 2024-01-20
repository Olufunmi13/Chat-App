import React, { useEffect } from "react";
import "./App.css";
import {  Routes, Route } from 'react-router-dom';
import { getRedirectResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
// import ChatBox from "./Components/ChatBox";
// import NavBar from "./Components/NavBar";
// import Welcome from "./Components/Welcome";
// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import ChatBox from "./Components/ChatBox";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  // const [user] = useAuthState(auth);
  const navigate = useNavigate();

 useEffect(() => {
   const handleRedirectResult = async () => {
     try {
       const result = await getRedirectResult(auth);
       if (result) {
         // The sign-in process was successful, result.user contains the signed-in user
         const user = result.user;
          console.log(user);
         // You can navigate to the chatbox or perform other actions here
         navigate('/chatbox');
       }
     } catch (error) {
       // Handle errors here
       console.error(error);
       // Show an error message to the user or log the error
     }
   };

   handleRedirectResult();
 }, [navigate]);

  return (
    // <div className="app">
    //   {/* <NavBar /> */}
      
    //   {/* {!user ? (
    //     <Welcome />
    //   ) : (
    //     <>
    //       <ChatBox />
    //     </>
    //   )} */}
    // </div>
    <div className="app">
      <Routes>
          <Route index element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
           <Route path="chatbox" element={<ChatBox />} /> 
          </Route>
          {/* <ProtectedRoute Component={ChatBox} path="/chatbox" /> */}
      </Routes>
   </div>
  );
}

export default App;

