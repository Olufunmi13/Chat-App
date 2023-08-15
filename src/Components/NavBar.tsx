import React from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className=" bg-blue-700 text-center p-2 text-white w-screen h-12 fixed top-0 z-[1] flex justify-between
  }">
      <h1 className="text-3xl font-bold">Chat App</h1>
      {/* {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )} */}
        {user ? 
        (<button 
            onClick={signOut} 
            type='button'
            className='p-1 hover:cursor-pointer hover:bg-blue-950 text-center rounded-lg'
            > 
            Log Out
        </button>) : 
        (<button 
            onClick={googleSignIn} 
            type='button'
            className='p-2 group-hover:cursor-pointer bg-blue-400 rounded-lg'
            > 
            Sign in with google
        </button>) }
        
    </nav>
  );
};

export default NavBar;
