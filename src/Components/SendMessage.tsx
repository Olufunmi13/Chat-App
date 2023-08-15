import React, {FormEvent, useState} from 'react'
import '../App.css';
import { IconSend } from '@tabler/icons-react';
import { auth,db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface SendMessageProps{
  scroll: React.RefObject<HTMLDivElement>;
}

const SendMessage: React.FC<SendMessageProps> = ({scroll}) => {
  const [message, setMessage] = useState<string>("");

    const sendMessage = async (event: FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      if (message.trim() === ""){
        alert("Enter valid message");
        return;
      }
      const { uid, photoURL,displayName} = auth.currentUser!;
      await addDoc(collection(db, "message"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("");
      scroll.current!.scrollIntoView({ behavior: "smooth" })
    }
  
  
  return (
    <form className='form' onSubmit={(event) => sendMessage(event)}>
        <label htmlFor='messageInput' hidden>
            Message
        </label>
        <input
        id='messageInput'
        name='messageInput'
        type='text'
        value={message}
        placeholder='Messsage'
        onChange={(e) => setMessage(e.target.value)}
        className='input'
        />
        <button className='send-button' type='submit'><IconSend /></button>
    </form>
  )
}

export default SendMessage