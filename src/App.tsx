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

