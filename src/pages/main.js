import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';

const MainPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Log In as</h1>
        <div className={styles.buttonContainer}>
          <Link to="/home/lawal" className={`${styles.button} ${styles.aliceBtn}`}>
            Lawal
          </Link>
          <Link to="/home/muazu" className={`${styles.button} ${styles.bobBtn}`}>
            Muazu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
