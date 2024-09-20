import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatWindow from '../components/organisms/ChatWindow';
import API from '../utils/api';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchChats = async () => {
      try {
        const res = await API.get('/chats');
        setChats(res.data);
        if (res.data.length > 0) {
          setCurrentChatId(res.data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch chats:', error.response.data.message);
      }
    };

    fetchChats();
  }, []);

  return (
    <div>
      <h1>Chats</h1>
      <div>
        {chats.map((chat) => (
          <div key={chat.id} onClick={() => setCurrentChatId(chat.id)}>
            Chat {chat.id}
          </div>
        ))}
      </div>
      {currentChatId && <ChatWindow chatId={currentChatId} />}
    </div>
  );
};

export default ChatPage;
