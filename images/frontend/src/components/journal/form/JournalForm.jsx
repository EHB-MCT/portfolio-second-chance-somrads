import React, { useState } from "react";
import axios from "axios";
import styles from "./form.module.scss";

/**
 * JournalForm component allows users to submit journal entries.
 * Once a journal entry is successfully posted, the `onPostSuccess` callback is triggered.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onPostSuccess - Callback to trigger upon successful journal post.
 * @returns {JSX.Element} The rendered JournalForm component.
 */
const JournalForm = ({ onPostSuccess }) => {
  // State for journal title
  const [title, setTitle] = useState("");
  // State for journal entry/content
  const [entry, setEntry] = useState("");

  /**
   * Handles the process of posting a journal entry to the server.
   * If the post is successful, it triggers the `onPostSuccess` callback.
   */
  const handlePost = async () => {
    try {
      const response = await axios.post("http://localhost:80/journal", {
        title,
        entry,
      });

      // Check if the response indicates a successful journal entry creation
      if (response.status === 201) {
        onPostSuccess();
      }
    } catch (error) {
      console.error("Error posting journal:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h4>Post a journal entry!</h4>
      <input
        type="text"
        placeholder="Title"
        value={title}
        // Update the title state with the new input value
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Your Journal Entry"
        value={entry}
        // Update the entry state with the new textarea value
        onChange={(e) => setEntry(e.target.value)}
      />
      <button onClick={handlePost}>Post Journal</button>
    </div>
  );
};

export default JournalForm;
