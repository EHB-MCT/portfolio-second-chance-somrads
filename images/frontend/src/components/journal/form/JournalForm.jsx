import React, { useState } from 'react';
import axios from 'axios';

const JournalForm = ({ onPostSuccess }) => {
    const [title, setTitle] = useState('');
    const [entry, setEntry] = useState('');

    const handlePost = async () => {
        try {
            const response = await axios.post('http://localhost:80/journal', {
                title,
                entry
            });
            
            if (response.status === 201) {
                onPostSuccess();
            }
        } catch (error) {
            console.error('Error posting journal:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea 
                placeholder="Your Journal Entry" 
                value={entry} 
                onChange={(e) => setEntry(e.target.value)}
            />
            <button onClick={handlePost}>Post Journal</button>
        </div>
    );
};

export default JournalForm;
