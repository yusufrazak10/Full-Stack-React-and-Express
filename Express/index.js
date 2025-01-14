const express = require('express');
const app = express();

// Middleware to enable (CORS)
const cors = require('cors');
app.use(cors());

// Middleware to secure HTTP headers
const helmet = require('helmet');
app.use(helmet());

// Path module to handle file paths
const path = require('path');

// Axios for making HTTP requests
const axios = require('axios');

// Config file containing API URL
const config = require('../Config/config.json');
const apiUrl = process.env.API_URL || config.apiUrl;

// Serve static files from the React app build directory in production
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the React build directory
  app.use(express.static(path.join(__dirname, 'my-react-app', 'build')));
  
  // Catch-all handler to serve index.html for any unmatched routes (React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-react-app', 'build', 'index.html'));
  });
}

// Route to search users based on query
app.get('/api/search/users', async (req, res) => {
  try {
    // Extract search query from request parameters
    const query = req.query.q;
    
    // Make a request to GitHub's search users API endpoint
    const response = await axios.get(`${apiUrl}/search/users?q=${query}`);
    
    // Send the list of user items in the response
    res.json(response.data.items);  
  } catch (error) {
    // If there's an error, send a 500 response with an error message
    res.status(500).json({
      error: {
        message: 'Failed to search users.'
      }
    });
  }
});

// Route to get details of a specific user by username
app.get('/api/users/:username', async (req, res) => {
  try {
    // Extract username from request parameters
    const username = req.params.username;
    
    // Make a request to GitHub's user details API endpoint
    const response = await axios.get(`${apiUrl}/users/${username}`);
    
    // Send the user data in the response
    res.json(response.data);  
  } catch (error) {
    // If there's an error, send a 500 response with an error message
    res.status(500).json({
      error: {
        message: `Failed to retrieve details for user: ${req.params.username}`
      }
    });
  }
});

// Route to get repositories of a specific user
app.get('/api/users/:username/repos', async (req, res) => {
  try {
    // Extract username from request parameters
    const username = req.params.username;
    
    // Make a request to GitHub's user repositories API endpoint
    const response = await axios.get(`${apiUrl}/users/${username}/repos`);
    
    // Send the repositories data in the response
    res.json(response.data);  
  } catch (error) {
    // If there's an error, send a 500 response with an error message
    res.status(500).json({
      error: {
        message: `Failed to retrieve repositories for user: ${req.params.username}`
      }
    });
  }
});

// Route to get details of a specific repository by owner and repo name
app.get('/api/repos/:owner/:repo', async (req, res) => {
  try {
    // Extract owner and repo from request parameters
    const owner = req.params.owner;
    const repo = req.params.repo;
    
    // Make a request to GitHub's repository details API endpoint
    const response = await axios.get(`${apiUrl}/repos/${owner}/${repo}`);
    
    // Send the repository data in the response
    res.json(response.data);  
  } catch (error) {
    // If there's an error, send a 500 response with an error message
    res.status(500).json({
      error: {
        message: `Failed to retrieve details for repo: ${req.params.repo}`
      }
    });
  }
});

// Route to get recent commits from a specific repository
app.get('/api/repos/:owner/:repo/commits', async (req, res) => {
  try {
    // Extract owner and repo from request parameters
    const owner = req.params.owner;
    const repo = req.params.repo;
    
    // Make a request to GitHub's commits API endpoint, limiting to 5 commits per page
    const response = await axios.get(`${apiUrl}/repos/${owner}/${repo}/commits?per_page=5`);
    
    // Send the commits data in the response
    res.json(response.data);  
  } catch (error) {
    // If there's an error, send a 500 response with an error message
    res.status(500).json({
      error: {
        message: `Failed to retrieve commits for repo: ${req.params.repo}`
      }
    });
  }
});

// Export the app for use in testing or in other environments
module.exports = app;



