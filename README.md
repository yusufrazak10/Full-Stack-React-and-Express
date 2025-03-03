# Full-Stack Web Application (React + Express)

## Task Overview

Create a **full-stack web application** using **React** for the frontend and **Express** for the backend. The app will interact with the **GitHub API** to provide:

1. **Search bar** for GitHub users with live search results.
2. **User profile page** displaying details like repositories, profile picture, bio, etc.
3. **Repository details** page showing last commits and repository description.
4. Integration with the **GitHub API** for fetching user and repository data.

Ensure the application is fully functional, meets the following criteria, and passes testing.

---

## Features

- **User Search**: Search for GitHub users and display search results.
- **User Profile**: Show user details (repositories, profile picture, bio).
- **Repo Details**: Display repository information like last commit, description, etc.
- **Responsive UI**: Clean, intuitive, and easy-to-navigate frontend.
- **Backend API Integration**: Securely fetch data from GitHub via the backend.

---

## Project Structure

- **Backend**: Express app with API routes to fetch data from GitHub.
- **Frontend**: React app with components for user search, profile, and repository details.

---

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Express, Axios, CORS, Helmet, dotenv
- **Dev Tools**: Jest, Nodemon, React Scripts

---

## Getting Started

### Prerequisites

1. Install **Node.js** (version 20.x.x).
2. Install **npm** (version 10.x.x).

### Installation

1. Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd <your-project-directory>
    ```

2. Install dependencies for both backend and frontend:

    - **Backend**:

      ```bash
      cd Express
      npm install
      ```

    - **Frontend**:

      ```bash
      cd ../my-react-app
      npm install
      ```

### Running the Application

- **Backend (Express)**: 
  ```bash
  npm run dev
Runs on port 5000 (auto-restarts with Nodemon).

Frontend (React):
cd my-react-app
npm start
Runs on port 3000.
Available Scripts

Backend
npm start: Starts the server with Node.
npm run dev: Starts the server with Nodemon.
npm test: Runs backend tests.
Frontend
npm start: Starts React app in development.
npm build: Builds the app for production.
npm test: Runs frontend tests.
Deployment

Push the backend and frontend to the same GitHub repository.
Follow instructions for deploying to Heroku.
Use the Heroku CLI for deployment.
Testing

Backend: Jest for unit tests.
Frontend: React Testing Library for UI testing.
Run tests with:

Backend: npm test
Frontend: cd my-react-app && npm test
