import React, { useState, useEffect } from 'react';

function Journal() {
  const [entry, setEntry] = useState("");
  const [diary, setDiary] = useState([]);

  // Load diary entries from localStorage on initial render
  useEffect(() => {
    const savedDiary = JSON.parse(localStorage.getItem('diary')) || [];
    setDiary(savedDiary);
  }, []);

  // Handle changes to the text area
  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  // Handle saving the entry
  const handleSave = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const dateString = currentDate.toLocaleString();
    const newDiary = [...diary, { desc: entry, date: dateString }];
    setDiary(newDiary);
    localStorage.setItem('diary', JSON.stringify(newDiary));
    setEntry("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Diary App</h1>
      </header>
      <textarea
        style={{ width: '80%', height: '150px', margin: '20px 0' }}
        value={entry}
        onChange={handleChange}
        placeholder="Write your diary entry here..."
      />
      <br />
      <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Save Entry
      </button>
      <div className="diary-entries" style={{ marginTop: '30px', width: '80%' }}>
        <h2>Previous Entries</h2>
        {diary.length > 0 ? (
          diary.map((entry, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p><strong>{entry.date}</strong></p>
              <p>{entry.desc}</p>
            </div>
          ))
        ) : (
          <p>No diary entries yet.</p>
        )}
      </div>
    </div>
  );
}

export default Journal;
