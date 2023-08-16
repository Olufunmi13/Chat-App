import React from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import '../App.css';
import { IconTrash } from '@tabler/icons-react';
import { format } from "date-fns";


interface MessageProps {
  message: {
    uid: string;
    avatar: string;
    name: string;
    text: string;
    createdAt: {
      seconds: number;
    };
    dodId: string,
  };
    handleDeleteMessage: (messageId: string) => void;
  };

const Message: React.FC<MessageProps> = ({ message, handleDeleteMessage }) => {
  const [user] = useAuthState(auth);

  let formattedTimestamp = ""; // Initialize formattedTimestamp

  // Check if message and createdAt property are available
  if (message && message.createdAt && message.createdAt.seconds) {
    // Format the timestamp
    formattedTimestamp = format(
      new Date(message.createdAt.seconds * 1000),
      "HH:mm:ss 'on' MMM d, yyyy"
    );
  }

  const isCurrentUser = user?.uid === message.uid
  const handleDeleteButtonClick = () => {
    if(isCurrentUser){
      handleDeleteMessage(message.dodId)
    }else{
      alert("You cannot delete this message!")
    };
  };

  return (
    <div
      className={`chat-img ${message.uid === user?.uid ? "right" : ""}`}
    >
      <img
        className="chat-img__left left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-img__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        <div className="flex justify-between">
            {formattedTimestamp && (
               <p className="text-slate-400">{formattedTimestamp}</p>
             )} 
           <button className="delete-button" onClick={handleDeleteButtonClick}>
               <IconTrash color="blue"/>
            </button> 
        </div>
            
        </div>
    </div>
  );
};

export default Message;
