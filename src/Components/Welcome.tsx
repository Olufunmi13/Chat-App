import React from 'react'
import {auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Welcome: React.FC<{}> = () => {
    const [user] = useAuthState(auth);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signOut = () => {
        auth.signOut();
    }
  return (
    <div className=' m-36 text-center flex-row justify-center align-middle overflow-hidden'>
        <h1 
        className='font-thin'>Welcome to the Chat Room</h1>
        {user ? 
        (<button 
            onClick={signOut} 
            type='button'
            className='p-1 hover:cursor-pointer bg-blue-400 rounded-lg'
            > 
            Sign Out
        </button>) : 
        (<button 
            onClick={googleSignIn} 
            type='button'
            className='p-2 group-hover:cursor-pointer bg-blue-400 rounded-lg'
            > 
            Sign in with google
        </button>) }
        
        
    </div>
  )
}

export default Welcome;
