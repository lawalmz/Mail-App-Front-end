import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMessages, fetchUnreadCount } from '../utils/api';
import styles from './Home.module.css';

const Home = () => {
  const { username } = useParams();
  const [totalMessages, setTotalMessages] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMessageCounts = async () => {
      try {
        const messages = await fetchMessages(username);
        const unreadCount = await fetchUnreadCount(username);
        setTotalMessages(messages.length);
        setUnreadMessages(unreadCount);
      } catch (error) {
        console.error('Error loading message counts:', error);
      }
    };

    loadMessageCounts();
  }, [username]);

  const goToInbox = () => {
    navigate(`/Inbox/${username}`);
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome, {username}!</h1>
      <p className={styles.paragraph}>
        You have <strong>{totalMessages}</strong> total messages,
      </p>
      <p className={styles.paragraph}>
        and <strong>{unreadMessages}</strong> of them are unread.
      </p>
      <button onClick={goToInbox} className={styles.button}>
        Go to Inbox
      </button>
    </div>
  );
};

export default Home;