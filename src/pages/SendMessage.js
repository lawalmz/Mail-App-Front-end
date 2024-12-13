import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SendMessageForm.module.css'; 

const SendMessageForm = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSender(username);
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageData = {
      sender,
      recipient: recipient.trim().toLowerCase(), 
      subject,
      body,
    };

    setIsLoading(true);

    try {
      await axios.post('https://mail-app-back-end.onrender.com/api/messages', messageData);
      setSuccessMessage('Message sent successfully');
      setError(null);
      setIsLoading(false);

      setTimeout(() => {
        navigate(`/inbox/${username}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccessMessage('');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.heading}>Send a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Send to:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient username"
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter message body"
              className={styles.textareaField}
            />
          </div>

          <button
            type="submit"
            className={`${styles.button} ${isLoading ? styles.buttonDisabled : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {isLoading && <p className={styles.loadingText}>Sending your message...</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default SendMessageForm;
