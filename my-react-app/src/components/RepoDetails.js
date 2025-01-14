import React, { useState, useEffect } from 'react';

const RepoDetails = ({ owner, repo }) => {
  // State to hold repository data, commits, error, and loading status
  const [repoData, setRepoData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Only fetch data if both owner and repo are provided
    if (owner && repo) {
      // Set loading to true when starting the fetch and clear any previous errors
      setLoading(true); 
      setError(null); 

      // Fetch repository data from GitHub API
      fetch(`https://api.github.com/repos/${owner}/${repo}`)
        .then((response) => {
          if (!response.ok) {
            // Handle error if response is not OK
            return response.json().then((errorData) => {
              throw new Error(`Error: ${errorData.message}`);
            });
          }
          // Parse the JSON response
          return response.json(); 
        })
        .then((data) => {
          // Set the repository data in state
          setRepoData(data); 

          // Fetch commits data from GitHub API
          return fetch(`https://api.github.com/repos/${owner}/${repo}/commits`);
        })
        .then((commitsData) => {
          if (!commitsData.ok) {
            // Handle error if commits response is not OK
            return commitsData.json().then((errorData) => {
              throw new Error(`Error: ${errorData.message}`);
            });
          }
          // Parse the JSON response for commits
          return commitsData.json(); 
        })
        .then((data) => {
          // Set the commits in state
          setCommits(data); 
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message); 
          setLoading(false); 
        });
    }
    // Re-fetch data when the owner or repo changes
  }, [owner, repo]); 

  // Show loading message while data is being fetched
  if (loading) {
    return <p>Loading repository details...</p>;
  }

  return (
    <div>
      {/* Show error message if an error occurred */}
      {error && <p>{error}</p>}

      {/* Repository Data Display */}
      {repoData && (
        <div>
          <h3>Repository: {repoData.name}</h3>
          <p>Description: {repoData.description || 'No description available'}</p>
          <p>Created at: {new Date(repoData.created_at).toLocaleDateString()}</p>
          <p>Last pushed at: {new Date(repoData.pushed_at).toLocaleDateString()}</p>
          <p>Stars: {repoData.stargazers_count}</p>
          <p><strong>Forks:</strong> {repoData.forks_count}</p>
        </div>
      )}

      {/* Commits Data Display */}
      {commits.length > 0 && (
        <div>
          <h4>Recent Commits:</h4>
          <ul>
            {commits.slice(0, 5).map((commit) => (
              <li key={commit.sha}>
                <p>
                  <strong>{commit.committer ? commit.committer.name : 'Unknown'}:</strong> {commit.commit.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RepoDetails;




