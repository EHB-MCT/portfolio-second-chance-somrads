import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import styles from "./hero.module.scss";

const Hero = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

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

  return (
    <div className={styles.hero}>
      <div className={styles.navBar}>
        <h1 className={styles.logo}>Anonymously connect</h1>
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
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Hero;
