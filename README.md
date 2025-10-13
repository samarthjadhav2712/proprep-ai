## PROPREP-AI
An intelligent, AI-powered platform designed for comprehensive interview preparation and session management. This application provides users with the tools to generate, manage, and track interview practice sessions with precision.

Table of Contents
About The Project

Technology Stack

Project Structure

Getting Started

Prerequisites

Server Installation

Client Installation

Core Features

API Testing Guide

Troubleshooting

About The Project
PROPREP-AI is a full-stack web application engineered to assist users in their interview preparation process by providing AI-generated questions and a robust session management system.

The application is built on the MERN stack (MongoDB, Express.js, React, Node.js) and integrates with the Google Gemini API to deliver the following core functionalities:

Generation of tailored interview questions based on user inputs.

Creation and management of distinct interview practice sessions.

Tools for tracking performance and recording notes within each session.

## Technology Stack
The project is built using a modern technology stack for both the frontend and backend.

# Frontend
React: A component-based JavaScript library for building user interfaces.
React Router DOM: A library for declarative, client-side routing.
Tailwind CSS: A utility-first CSS framework for rapid and custom UI development.
Axios: A promise-based HTTP client for making API requests.
Framer Motion: A production-ready library for creating fluid animations.
Lucide React: A lightweight and performant icon toolkit.
React Syntax Highlighter: A component for styling code blocks with syntax highlighting.

# Backend
- Node.js: A JavaScript runtime environment for executing server-side code.
- Express.js: A minimal and flexible web application framework for Node.js.
- MongoDB: A NoSQL document database for data storage.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- JSON Web Token (JWT): A standard for creating access tokens for secure authentication.
- Bcrypt.js: A library for hashing user passwords.
- Google Generative AI SDK: The official SDK for interacting with the Gemini AI model.
- Multer: A middleware for handling multipart/form-data, used for file uploads.
- Dotenv: A module for loading environment variables from a .env file.

## Project Structure
The repository is organized into a standard client-server architecture.
Client Directory
/client
└── src
    ├── assets/
    ├── components/
    ├── Context/
    ├── Pages/
    ├── Utils/
    ├── App.jsx
    └── main.jsx
Server Directory
/server
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── db.js
└── server.js

# Getting Started
- Follow these instructions to set up and run the project on your local machine.

# Prerequisites
Ensure you have the following software installed:

Node.js (LTS version recommended, preferably managed via nvm)

npm (Node Package Manager)

MongoDB (a local instance or a cloud-based service like MongoDB Atlas)

Server Installation
Clone the repository:

Bash

git clone https://github.com/your-username/proprep-ai.git
Navigate to the server directory:

Bash

cd proprep-ai/server
Install dependencies:

Bash

npm install
Configure environment variables: Create a .env file in the /server root and add the following required variables:

Code snippet

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
Start the server:

Bash

npm run dev
Client Installation
Navigate to the client directory:

Bash

cd ../client
Install dependencies:

Bash

npm install
Start the client application:

Bash

npm run dev
Core Features
User Authentication: Secure user registration and login functionality implemented with JWT for stateless authentication.

AI Question Generation: Dynamic generation of interview questions using the Google Gemini API, tailored to user-specified criteria.

Session Management: Full CRUD (Create, Read, Update, Delete) capabilities for managing interview practice sessions.

Interactive Q&A Interface: Users can add generated questions to sessions, pin important items, and append personal notes for review.

Profile Management: Functionality for users to view and update their profile information, including a profile photo upload feature.

API Testing Guide
For testing protected API endpoints, a valid JWT must be included in the request header. The following script can be used in Postman to automate this process:

After a successful login request, navigate to the Tests tab.

Add the following script to automatically store the authentication token as a collection variable:

JavaScript

pm.collectionVariables.set("accessToken", pm.response.json().token);
For subsequent requests to protected routes, set the authorization type to Bearer Token and use {{accessToken}} as the token value.