
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    
    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make API request
            const response = await axios.get('https://bajaj-student-rest-api.onrender.com/bfhl/data?', {
                params: {
                    data: inputData
                }
            });

            // Update state with results
            setResults(response.data);
            setError('');}catch (err) {
              // Handle errors
              setResults([]);
              setError('Error fetching data');
          }};
  return (
    
      <div className="App">
            <form onSubmit={handleSubmit}>
              <label className='label'>API Input</label>
                <input
                    type="text"
                    value={inputData}
                    onChange={handleInputChange}
                    placeholder="Enter comma-separated values"
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((user, index) => (
                            <li key={index}>
                                <p>User ID: {user.user_id}</p>
                                <p>Email: {user.email}</p>
                                <p>Roll Number: {user.roll_number}</p>
                                <p>Numbers: {user.numbers.join(', ')}</p>
                                <p>Alphabets: {user.alphabets.join(', ')}</p>
                                <p>Highest Alphabet: {user.highest_alphabet.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
    </div>
    
  );
}

export default App;
