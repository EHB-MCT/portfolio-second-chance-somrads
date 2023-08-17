import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import JournalForm from "../journal/form/JournalForm";
import JournalList from "../journal/list/JournalList";
import styles from "./hero.module.scss";

const Hero = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [journalKey, setJournalKey] = useState(0);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const refreshEntries = () => {
    setJournalKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={styles.hero}>
      <div className={styles.navBar}>
        <h1 className={styles.logo}>Anonymously Connect</h1>
        {user && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
      {user ? (
        <div className={styles.welcomeWrapper}>
          <h2 className={styles.welcomeText}>
            Welcome, {user.firstName} {user.lastName}!
          </h2>
          <div className={styles.journalWrapper}>
            <JournalForm onPostSuccess={refreshEntries} />
            <JournalList key={journalKey} />
          </div>
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Hero;
