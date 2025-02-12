import React, { useState } from 'react';

// SearchBox component accepts 'onSearchResults' function as a prop to handle the search results.
const SearchBox = ({ onSearchResults }) => {
  // State variables to manage error message, loading state, and search query.
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handler function to update the search query as the user types.
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler function to trigger the search when the form is submitted.
  const handleSearchSubmit = (event) => {
    // Prevents the form from reloading the page on submit.
    event.preventDefault(); 
    // Set loading to true when the search starts.
    setLoading(true); 
    setError(''); 

    // Fetch request to GitHub's search API for users based on the search query.
    fetch(`/api/search/users?q=${encodeURIComponent(searchQuery)}`)
      .then((response) => {
        // Check if the response is not okay, and if so, throw an error.
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Error: ${errorData.message}`);
          });
        }
        return response.json(); // Parse the response JSON.
      })
      .then((data) => {
        // If the data contains a list of users, pass it to the onSearchResults callback.
        if (Array.isArray(data.items) && data.items.length > 0) {
          onSearchResults(data.items);
        } else {
          setError('No users found'); 
        }
        setLoading(false);
      })
      .catch((error) => {
        // Catch any errors from the fetch request and display the error message.
        setError(`Error: ${error.message}`);
        setLoading(false); 
      });
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div>
        <label>Search:</label>
        {/* Input field for user to type the search query */}
        <input
          type="text"
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Enter a username to search"
        />
      </div>
      <button type="submit">Search</button> {/* Submit button to trigger search */}

      {/* Show loading indicator if search is in progress */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Show error message if there is an error */}
      {error && <p>{error}</p>}
    </form>
  );
};

export default SearchBox;










