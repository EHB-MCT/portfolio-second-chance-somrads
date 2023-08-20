import React, { useState } from "react";
import axios from "axios";
import styles from "../login/login.module.scss";

/**
 * Login component for users to join and share their stories.
 *
 * @param {Object} props
 * @param {Function} props.onLoginSuccess - Callback function to handle successful login.
 * @returns {ReactElement}
 */
const Login = ({ onLoginSuccess }) => {
  // State to hold user input for first name and last name.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  /**
   * Handles the login process.
   * Makes an API call to the backend and processes the response.
   */
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:80/users", {
        firstName: firstName,
        lastName: lastName,
      });

      // If the user is successfully created
      if (response.status === 201) {
        onLoginSuccess(response.data);
      }
    } catch (error) {
      console.error("Login error:", error);

      // Error handling for a user with an existing name.
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

  /**
   * Handles the key press event on the input.
   * If the 'Enter' key is pressed, the handleLogin function is triggered.
   *
   * @param {Event} event - The keyboard event.
   */
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
          Share your joys, troubles, and stories while reading others
          anonymously.
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
      <p className={styles.credit}>
        Created by Somrad Sharma for the course Development 5 ( 2022- 2023){" "}
      </p>
    </div>
  );
};

export default Login;
