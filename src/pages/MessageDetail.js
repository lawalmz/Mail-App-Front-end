import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessages, markAsRead } from '../utils/api';
import styles from './MessageDetail.module.css';

const MessageDetail = () => {
  const { id, username } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const messages = await fetchMessages(username);
        const selectedMessage = messages.find((msg) => msg._id?.toString() === id);
        setMessage(selectedMessage);
      } catch (error) {
        console.error('Error loading message:', error);
      }
    };

    loadMessage();
  }, [id, username]);

  const handleMarkAsRead = async (messageId) => {
    try {
      await markAsRead(username, messageId);
      setMessage((prevMessage) => ({
        ...prevMessage,
        isRead: true,
      }));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (!message) {
    return <p className={styles.fallbackMessage}>Select a message to view its details.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{message.subject}</h1>
      </div>
      <p className={styles.body}>{message.body}</p>
      <div className={styles.statusContainer}>
        <span className={styles.status}>{message.isRead ? 'Read' : 'Unread'}</span>
        {!message.isRead && (
          <button
            className={styles.button}
            onClick={() => handleMarkAsRead(message._id)}
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageDetail;
