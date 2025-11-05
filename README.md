# ProPrep-AI

ProPrep-AI is an AI-powered interview preparation app that generates role-specific interview questions and beginner-friendly answers, lets users create sessions, pin questions, and add personal notes.

Features
- Generate interview questions & explanations using Google Generative AI (Gemini)
- Create and manage session-based Q&A collections
- Pin important questions and save personal notes
- User auth (register/login) with JWT and profile image upload
- Markdown-rendered answers with syntax-highlighted code samples

Tech stack
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer
- Frontend: React (Vite), Tailwind CSS, Framer Motion, React Router, Axios
- AI: @google/genai (Gemini)

Quick start (overview)
1. Server: cd server → npm install → create .env (MONGO_URI, JWT_SECRET, GOOGLE_API_KEY) → npm run dev  
2. Client: cd Client → npm install → npm run dev
