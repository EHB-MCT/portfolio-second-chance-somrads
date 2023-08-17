import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./list.module.scss";

const JournalList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:80/journal");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  return (
    <div className={styles.listContainer}>
        <h3>Anonymous Journal Entries</h3>
      {entries.map((entry) => (
        <div key={entry.id} className={styles.entryBox}>
          <span className={styles.date}>
            {new Date(entry.date).toLocaleString()}
          </span>
          <h3>{entry.title}</h3>
          <p>{entry.entry}</p>
        </div>
      ))}
    </div>
  );
};

export default JournalList;
