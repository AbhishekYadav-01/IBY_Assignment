import React from 'react';
import MessageItem from '../molecules/MessageItem';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
