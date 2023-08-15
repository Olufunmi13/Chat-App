import React, {useRef, useEffect, useState} from 'react';
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { QuerySnapshot, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import SendMessage from './SendMessage';
import Message from './Message';
import "../App.css";



const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]); 
  const scrollRef = useRef<HTMLDivElement>(null);

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

