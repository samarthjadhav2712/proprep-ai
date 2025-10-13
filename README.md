PROPREP-AI 🤖
An intelligent interview preparation platform designed to help users practice and excel in their job interviews using AI-generated questions and session management.

Table of Contents
About The Project

Built With

Project Structure

Getting Started

Prerequisites

Server Setup

Client Setup

Features

API Testing with Postman

Troubleshooting

About The Project
PROPREP-AI is a full-stack web application that leverages the power of Google's Gemini AI to create a dynamic and effective interview preparation experience. Users can register, create practice sessions, generate relevant interview questions, and track their progress. This project is built with the MERN stack (MongoDB, Express.js, React, Node.js).

Built With
This project is built using modern web technologies for both the frontend and backend.

Client (Frontend)
React: A JavaScript library for building user interfaces.

React Router DOM: For declarative routing in the React application.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Axios: A promise-based HTTP client for making API requests.

Framer Motion: For creating fluid animations.

Lucide React: A beautiful and consistent icon toolkit.

React Syntax Highlighter: For styling code blocks.

Server (Backend)
Node.js: A JavaScript runtime environment.

Express.js: A minimal and flexible Node.js web application framework.

MongoDB: A NoSQL database for storing application data.

Mongoose: An ODM library for MongoDB and Node.js.

JSON Web Token (JWT): For implementing secure user authentication.

Bcrypt.js: For hashing user passwords.

@google/generative-ai: The official Google Gemini AI SDK.

Multer: Middleware for handling multipart/form-data, used for file uploads.

Dotenv: For loading environment variables from a .env file.

Project Structure
The project is organized into a client-server architecture.

Client Directory
/client
└── src
    ├── assets/
    ├── components/
    │   ├── Cards/
    │   ├── Inputs/
    │   ├── Layouts/
    │   └── Loaders/
    ├── Context/
    │   └── UserContext.jsx
    ├── Pages/
    │   ├── Auth/
    │   ├── Home/
    │   └── interviewprep/
    ├── Utils/
    │   ├── apipath.js
    │   └── axiosinstance.js
    ├── App.jsx
    └── main.jsx
Server Directory
/server
├── controllers/
│   ├── authController.js
│   ├── aiController.js
│   └── sessionController.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── userModel.js
│   ├── sessionModel.js
│   └── questionModel.js
├── routes/
│   ├── authRoutes.js
│   ├── aiRoutes.js
│   └── sessionRoutes.js
├── uploads/
├── db.js
└── server.js
Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (it's recommended to use nvm to manage Node versions)

npm or yarn

MongoDB: You can use a local instance or a cloud service like MongoDB Atlas.

Server Setup
Clone the repository

Bash

git clone https://github.com/your-username/proprep-ai.git
Navigate to the server directory

Bash

cd proprep-ai/server
Select the correct Node.js version

Bash

nvm use
Install NPM packages

Bash

npm install
Create a .env file in the /server root and add the following environment variables.

Code snippet

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
To generate a secure JWT_SECRET, run this command in your terminal:

Bash

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
Start the server

Bash

npm run dev
The server will start on http://localhost:5000.

Client Setup
Navigate to the client directory (from the root folder)

Bash

cd client
Install NPM packages

Bash

npm install
Start the client application

Bash

npm run dev
The React development server will start, typically on http://localhost:5173.

Features
✅ Secure User Authentication: Safe and secure user registration and login using JWT.

✅ AI-Powered Question Generation: Leverage the Google Gemini API to generate tailored interview questions.

✅ Full CRUD for Sessions: Users can Create, Read, Update, and Delete their interview practice sessions.

✅ Interactive Question Management: Add questions to a session, toggle a "pin" on important ones, and write personal notes for each question.

✅ User Profile Management: View and update user profiles, including a profile photo upload feature.

✅ Intuitive Dashboard: A central hub for users to easily access and manage all their preparation materials.

API Testing with Postman
To test the protected API routes, you need to include the JWT in the authorization header. Here’s how you can automate this in Postman:

Send a POST request to your login endpoint (/api/auth/login) with valid credentials.

In the Tests tab for the login request, add the following script. This will automatically save the received token as a collection variable.

JavaScript

pm.collectionVariables.set("accessToken", pm.response.json().token);
Now, for any protected route (e.g., GET /api/users/profile), go to the Authorization tab, select Type as Bearer Token, and set the Token field to {{accessToken}}.

Postman will now automatically use the latest token for all protected requests!

Troubleshooting
Problem: Getting a "Not authorized, no token" error.

Reason: This means the API route you are trying to access is protected and requires a valid JWT, but you didn't provide one in the request header.

Solution: Ensure you are sending the Authorization header with the format Bearer <your_token>. If using Postman, follow the setup guide above to automate this process.
