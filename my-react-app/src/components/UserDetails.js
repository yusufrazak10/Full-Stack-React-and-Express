import React, { useState, useEffect } from 'react';

const UserDetails = ({ username, onRepoSelect, onBack }) => {
  // State variables to hold user data, repository data, error message, and loading state.
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch user data and repositories whenever the 'username' prop changes.
  useEffect(() => {
    // Only proceed if a username is provided.
    if (username) { 
      setLoading(true); 
      setError('');

      // Fetch the user's GitHub details based on the username.
      fetch(`https://api.github.com/users/${username}`)
        // Parse the user data from the response.
        .then((response) => response.json()) 
        .then((data) => {
          // Store the user data in state.
          setUserData(data); 

          // After getting user data, fetch the repositories for the user.
          return fetch(`https://api.github.com/users/${username}/repos`);
        })
        // Parse the repository data.
        .then((reposData) => reposData.json()) 
        .then((data) => {
          // Store the repository data in state.
          setRepos(data); 
          setLoading(false); 
        })
        .catch((error) => {
          setError(`Error: ${error.message}`); 
          setLoading(false); 
        });
    }
    // Dependency array ensures this effect runs when 'username' changes.
  }, [username]); 

  // If data is still loading, display a loading message.
  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      {/* Button to navigate back to the search page */}
      <button onClick={onBack}>Back to Search Page</button>

      {/* Display error message if there is any error */}
      {error && <p>{error}</p>}

      {/* Display user details if user data is available */}
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          {/* Display user avatar */}
          <img src={userData.avatar_url} alt={userData.login} width="150" />
          <p><strong>Username:</strong> {userData.login}</p>
          <p><strong>Location:</strong> {userData.location || 'Not available'}</p>
          <p><strong>Followers:</strong> {userData.followers}</p>
          <p><strong>Following:</strong> {userData.following}</p>
          <p><strong>Public Repos:</strong> {userData.public_repos}</p>
          <p><strong>Bio:</strong> {userData.bio || 'No bio available'}</p>
          {/* Link to visit GitHub profile */}
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">Visit GitHub Profile</a>
        </div>
      )}

      {/* Display repository list if there are repositories */}
      {repos.length > 0 && (
        <div>
          <h3>Repositories:</h3>
          <ul>
            {/* Map over the repositories and display each one */}
            {repos.map((repo) => (
              <li key={repo.id}>
                <h4>
                  {/* Button to select a repository */}
                  <button onClick={() => onRepoSelect(repo.name)}>
                    {repo.name}
                  </button>
                </h4>
                <p>{repo.description || 'No description available'}</p>
                <p><strong>Language:</strong> {repo.language || 'Not specified'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails; 







