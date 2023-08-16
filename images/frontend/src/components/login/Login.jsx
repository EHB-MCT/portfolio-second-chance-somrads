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

      if (response.status === 201) {
        // Assuming 201 is the status code for successful creation
        onLoginSuccess(response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data.error === "User with the same name already exists"
      ) {
        alert("The name is already in use. Please choose a different name.");
      } else {
        alert("Error during login. Please try again later.");
      }
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
        <h1>Join us!</h1>
        <p>
          Share your joys, troubles, and stories while reading others anonymously.
        </p>
        <input
          type="text"
          placeholder="Fake First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fake Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <p className={styles.credit}>Created by Somrad Sharma for the course Development 5 ( 2022- 2023) </p>
    </div>
  );
};

export default Login;
