GitHub User and Repository Search

A full-stack application built with React and Express that allows users to search for GitHub users, view their profiles, and explore their repositories and commits.

Features
Search for GitHub users by username.
View detailed user profiles, including followers, public repositories, and bio.
Browse a user's repositories with descriptions and languages.
View recent commits for the repository.

Technologies Used
Frontend: React, Bootstrap, React Router
Backend: Node.js, Express, Axios, CORS, Helmet
API: GitHub REST API

Installation

Prerequisites
Node.js: v20 or higher
npm: v10 or higher

Steps to Install
Clone the repository:
git clone https://github.com/yourusername/your-repository-name.git

Install backend dependencies:
cd your-repository-name/Express
npm install

Install frontend dependencies:
cd your-repository-name/my-react-app
npm install

Create a .env file in the server folder with the following environment variable:
API_URL=https://api.github.com

Start the backend server (in server directory):
npm run dev
This will start the Express server on http://localhost:5000.

Start the frontend React application (in my-react-app directory):
npm start
This will run the React app on http://localhost:3000 and proxy API requests to the Express server.
Visit the app in your browser: http://localhost:3000.

Building for Production
To build the React app for production:

Navigate to the my-react-app directory:
cd my-react-app
Run the build command:
npm run build
This will create an optimized production build in the build/ folder.

API Endpoints

1. Search for Users
GET /api/search/users?q={query}
Query Parameters:
q: The search query (e.g., username).
Response: A list of users matching the search query.

2. Get User Details
GET /api/users/{username}
Path Parameters:
username: The username of the GitHub user.
Response: Detailed information about the user.

3. Get User Repositories
GET /api/users/{username}/repos
Path Parameters:
username: The username of the GitHub user.
Response: A list of repositories belonging to the user.

4. Get Repository Details
GET /api/repos/{owner}/{repo}
Path Parameters:
owner: The owner of the repository.
repo: The name of the repository.
Response: Detailed information about the repository.

5. Get Repository Commits
GET /api/repos/{owner}/{repo}/commits
Path Parameters:
owner: The owner of the repository.
repo: The name of the repository.
Response: A list of the most recent commits in the repository.

Testing

Express API Tests
To test the backend API routes with supertest, follow these steps:
Install the required testing dependencies:
cd Express
npm install --save-dev supertest
npm install jest@29.7.0 --save-dev
Run the backend tests:
npm test

React Component Tests
To test the frontend components with React Testing Library and Jest, follow these steps:
Install testing dependencies for the React app:
cd my-react-app
npm install --save-dev @testing-library/react @testing-library/jest-dom jest axios
Run the React component tests:
npm test

Fork the repository.
Create a new branch for your feature (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to your branch (git push origin feature-branch).
Create a new Pull Request.
