Full Stack Application: React + Express

Description

This project consists of a full-stack application with a React frontend and an Express backend. The frontend handles the user interface, while the backend provides the server-side functionality and APIs. The two are connected via HTTP requests.

Technologies Used

Frontend:
React: A JavaScript library for building user interfaces.
React Router DOM: A collection of navigational components for React.
Axios: Promise-based HTTP client for the browser and Node.js.

Backend:
Express: Web framework for Node.js.
Axios: Promise-based HTTP client for the backend to make requests to other services.
Helmet: Security middleware for Express apps.
CORS: A middleware to enable cross-origin requests.
dotenv: Loads environment variables from a .env file.

Dev Tools:
Jest: JavaScript testing framework.
Nodemon: A tool that automatically restarts the server during development.
React Scripts: Scripts for running and building a React application.

Project Structure

Backend (Express): Contains server logic and API routes (server.js).
Frontend (React): React application located in the my-react-app folder.
Root: Contains configurations and additional packages for both frontend and backend.

Getting Started

Prerequisites
Install Node.js (version 20.x.x).
Install npm (version 10.x.x).

Installation
Clone the repository and install dependencies for both the backend and frontend.

# Clone the repository
git clone <your-repo-url>
cd <your-project-directory>

# Install dependencies for the backend
cd Express
npm install

# Install dependencies for the frontend
cd ../my-react-app
npm install

Running the Application

Backend (Express)
The backend runs on port 5000. To start the backend server, run:
npm run dev
This command starts the server using Nodemon (for automatic restarts during development).

Frontend (React)
The frontend runs on port 3000. To start the React app, run:
cd my-react-app
npm start
This will start the React development server. It will automatically open your browser and navigate to http://localhost:3000.

Available Scripts

Backend (Express)
npm start: Starts the server using node.
npm run dev: Starts the server using nodemon (for automatic restarts).
npm test: Runs tests using Jest.
heroku-postbuild: Used for deployment, installs frontend and builds it.

Frontend (React)
npm start: Runs the React app in development mode.
npm build: Builds the React app for production.
npm test: Runs tests for the frontend.
npm eject: Ejects the configuration for customization (advanced use).

Proxying API Requests

In the frontend/package.json, the following line is configured:

"proxy": "http://localhost:5000"
This ensures that API requests from the React app are proxied to the Express backend running on port 5000.

Deployment

To deploy the application to Heroku:

Push the backend and frontend to the same Git repository.
Make sure to have a Heroku account and the Heroku CLI installed.
Follow the instructions for deploying a Node.js app to Heroku.

Testing

The backend uses Jest for unit tests.
The frontend uses React Testing Library for UI testing.
To run the tests, use:
# Run backend tests
npm test

# Run frontend tests
cd my-react-app
npm test
