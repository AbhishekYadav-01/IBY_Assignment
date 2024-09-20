import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import API from '../../utils/api';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      transports: ['websocket'],
      withCredentials: true,
    });
  
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('joinChat', chatId);
    });
  
    // Handle incoming messages
    socket.on('receiveMessage', (message) => {
      // Update messages state
    });
  
    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [chatId]);
  

  const sendMessage = () => {
    if (messageContent.trim() !== '') {
      socket.emit('sendMessage', { chatId, message: messageContent });
      setMessageContent('');
    }
  };

  return (
    <div>
      <MessageList messages={messages} />
      <div>
        <Input
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatWindow;
