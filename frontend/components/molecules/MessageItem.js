import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  margin: 5px 0;
`;

const MessageItem = ({ message }) => {
  return (
    <MessageContainer>
      <strong>{message.User.username}:</strong> {message.content}
    </MessageContainer>
  );
};

export default MessageItem;
