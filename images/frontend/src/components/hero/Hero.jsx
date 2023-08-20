import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import JournalForm from "../journal/form/JournalForm";
import JournalList from "../journal/list/JournalList";
import styles from "./hero.module.scss";

/**
 * The Hero component serves as the main interface for user authentication
 * and displaying journal entries. If the user is authenticated, they'll be
 * shown their journal entries and have the ability to add new ones.
 * If not, they will be prompted to log in.
 *
 * @returns {JSX.Element} Renders the Hero component.
 */
const Hero = () => {
  // Retrieve the user from local storage, if present
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  // State to force a re-render of the JournalList component when new entries are added
  const [journalKey, setJournalKey] = useState(0);

  /**
   * Handles successful login by updating the user state and storing user data in local storage.
   *
   * @param {Object} userData - Data of the logged-in user.
   */
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * Handles user logout by resetting the user state and removing user data from local storage.
   */
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Store the user in local storage whenever the user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  /**
   * Triggers a re-render of the JournalList component to reflect new entries.
   */
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
