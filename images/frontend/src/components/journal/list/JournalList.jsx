import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JournalList = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await axios.get('http://localhost:80/journal');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching journal entries:', error);
        }
    };

    return (
        <div>
            {entries.map(entry => (
                <div key={entry.id}>
                    <h3>{entry.title}</h3>
                    <p>{entry.entry}</p>
                    <span>{new Date(entry.date).toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export default JournalList;
