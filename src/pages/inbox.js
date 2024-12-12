import React, { useState, useEffect } from 'react';
import { fetchMessages } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import styles from './inbox.module.css';

const Inbox = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages(username);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [username]);

  const getMessageSnippet = (content) => {
    if (!content) return '';
    return content.length > 30 ? content.substring(0, 30) + ' .......... ' : content;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Inbox</h1>
      </header>

      {messages.length === 0 ? (
        <p className={styles.noMessages}>No messages found.</p>
      ) : (
        <ul className={styles.messageList}>
          {messages.map((message) => (
            <Link
              to={`/message/${message._id}/${username}`}
              key={message.id}
              className={styles.link}
            >
              <li
                className={styles.messageCard}
                style={{ backgroundColor: message.isRead ? '#f1f3f4' : '#fff' }}
              >
                <h3
                  className={`${styles.subject} ${message.read ? styles.readSubject : styles.unreadSubject
                    }`}
                >
                  {message.subject}
                </h3>
                <p
                  className={`${styles.snippet} ${message.read ? styles.readSnippet : styles.unreadSnippet
                    }`}
                >
                  {getMessageSnippet(message.body)}
                </p>
                <div className={styles.statusContainer}>
                  <span className={styles.status}>
                    {message.status === 'sent' ? 'Sent' : 'Received'}
                  </span>
                  <Link
                    to={`/message/${message._id}/${username}`}
                    className={styles.link}
                  >
                    View Full Message
                  </Link>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
      <div className={styles.footer}>
        <Link to={`/send-message/${username}`} className={styles.footerButton}>
          Send a Message
        </Link>
      </div>
    </div>
  );
};

export default Inbox;
