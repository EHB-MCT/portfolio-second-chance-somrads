import React, { useState } from "react";
import axios from "axios";
import styles from "../login/login.module.scss";

const Login = ({ onLoginSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:80/users", {
        firstName: firstName,
        lastName: lastName,
      });
      console.log(response.data);
      if (response.data) {
        onLoginSuccess(response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <p>
          Share your joys, troubles, and stories while reading others. <br />{" "}
          <br /> Join the world of shared experiences anonymously!
        </p>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
