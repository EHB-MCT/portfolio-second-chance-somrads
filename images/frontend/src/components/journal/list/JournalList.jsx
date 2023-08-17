import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./list.module.scss";

/**
 * JournalList component fetches and displays journal entries from a server.
 * It also provides functionality to delete a specific journal entry.
 *
 * @returns {JSX.Element} Renders the list of journal entries.
 */
const JournalList = () => {
  // State to hold fetched journal entries
  const [entries, setEntries] = useState([]);

  // Fetch journal entries when the component mounts
  useEffect(() => {
    fetchEntries();
  }, []);

  /**
   * Asynchronously fetches journal entries from the server and updates the state.
   */
  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:80/journal");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  /**
   * Deletes a specific journal entry given its ID.
   * If the delete is successful, the list of entries is refreshed.
   *
   * @param {number} id - ID of the journal entry to delete.
   */
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:80/journal/${id}`);
      if (response.status === 200) {
        fetchEntries();
        alert("Journal entry deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  };

  return (
    <div className={styles.listContainer}>
      <h3>Anonymous Journal Entries</h3>
      {/* Display entries in reverse order so newest entries appear first */}
      {entries
        .slice()
        .reverse()
        .map((entry) => (
          <div key={entry.id} className={styles.entryBox}>
            <span className={styles.date}>
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <h3>{entry.title}</h3>
            <p>{entry.entry}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(entry.id)}
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default JournalList;
