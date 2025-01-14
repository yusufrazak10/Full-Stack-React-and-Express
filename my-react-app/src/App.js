import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import UserDetails from './components/UserDetails';
import RepoDetails from './components/RepoDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // Set all states.
  const [selectedUser, setSelectedUser] = useState(null); 
  const [selectedRepo, setSelectedRepo] = useState(null); 
  const [searchResults, setSearchResults] = useState([]); 

  // Handle user search and display users
  const handleSearchResults = (users) => {
    setSearchResults(users);
  };

  // Handle user selection from the search results
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Clear search results after user selection
    setSearchResults([]); 
    // Clear selected repo
    setSelectedRepo(null); 
  };

  // Handle repo selection from the repo list
  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
  };

  // Handle going back to the search results page
  const handleBackToSearchResults = () => {
    // Reset selected user
    setSelectedUser(null); 
    // Reset search results
    setSearchResults([]); 
    // Reset selected repo
    setSelectedRepo(null); 
  };

  // Handle going back to the user profile page (without clearing search results)
  const handleBackToUserProfile = () => {
    // Clear the selected repo
    setSelectedRepo(null); 
  };

  return (
    <div>
      <h1>GitHub User and Repository Search</h1>

      {/* Show search box if no user is selected */}
      {!selectedUser && (
        <SearchBox onSearchResults={handleSearchResults} />
      )}

      {/* Display search results when users are available */}
      {searchResults.length > 0 && !selectedUser && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((user) => (
              <li key={user.login}>
                <button onClick={() => handleUserSelect(user)}>
                  {user.login}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show user details when a user is selected */}
      {selectedUser && !selectedRepo && (
        <UserDetails
          username={selectedUser.login}
          onRepoSelect={handleRepoSelect}
          onBack={handleBackToSearchResults} 
        />
      )}

      {/* Show repo details when a repository is selected */}
      {selectedRepo && selectedUser && (
        <div>
          <button onClick={handleBackToUserProfile}>Back to User Profile</button>
          <RepoDetails owner={selectedUser.login} repo={selectedRepo} />
        </div>
      )}
    </div>
  );
};

export default App; 








