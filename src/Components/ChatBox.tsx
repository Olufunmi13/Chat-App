import React, {useRef, useEffect, useState} from 'react';
import companyLogo from '../img/chatapp-logo.webp';
import { useNavigate } from 'react-router-dom';
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { QuerySnapshot, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import SendMessage from './SendMessage';
import Message from './Message';
import "../App.css";



const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate(); 
  const scrollRef = useRef<HTMLDivElement>(null);
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };
  const handleDeleteMessage = async (dodId: string) => {
    try{
      const messageRef = doc(db, "message", dodId);
      await deleteDoc(messageRef );
      setMessages((prevMessages) =>
      prevMessages.filter((message) => message.dodId !== dodId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect (() => {
    const q = query(
      collection(db, "message"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        dodId: doc.id,
  
      }));
      setMessages(fetchedMessages);
      console.log(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
  
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" , block: "end"});
    }
  }, [messages]);
  

  return (
    <div ref={scrollRef} className="chat-box ">
      <nav className=" bg-[#E9ECF6] text-center align-middle sm:text-lg p-2 text-white w-screen h-12 fixed top-0 max-w-full z-[1] flex justify-between
  }">  
      <button type='button' aria-label='Company Logo' tabIndex={0} style={{border: 'none',  background: 'none', outline: 'none'}} onClick={() => navigate('/signin')}>
      <img className='h-7 w-auto text-center align-middle' src={companyLogo} alt="logo"/>
      </button>
        {user ? 
        (<button 
            onClick={signOut} 
            type='button'
            className=' hover:bg-[#FC5C6C] pr-1 pl-1 text-center rounded-lg text-[#002177] border-[#FC5C6C] border-2'
            > 
            Sign Out
        </button>) : " " }
    </nav>
     <div className="messages-wrapper">
        {messages.map((message) => (
          <Message key={message.dodId} message={message} handleDeleteMessage={handleDeleteMessage}/>
        ))}
      </div>
      {/* <button className="delete-button" onClick={handleDeleteMessage}>
       Delete
      </button> */}
      <span ref={scrollRef}></span>
    <SendMessage scroll={scrollRef}/> 
    </div>
  ) 
}

export default ChatBox;

//bg-[#013397]