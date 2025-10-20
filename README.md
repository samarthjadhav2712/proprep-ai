# ProPrep-AI

ProPrep-AI is a full-stack interview preparation platform that uses generative AI to produce role-specific interview questions and beginner-friendly answers, and provides session management for users to organize, pin, and add notes to questions. The backend uses Node.js + Express + MongoDB, and the frontend is a React + Vite SPA with Tailwind CSS and Framer Motion.

---

## Highlights (Resume-style bullets)

- Built a secure REST API with JWT-based auth, password hashing and image uploads (Multer). See server entry points: [server/server.js](server/server.js) and auth logic: [`registerUser`](server/controllers/authController.js), [`loginUser`](server/controllers/authController.js), [`getUserProfile`](server/controllers/authController.js).
- Integrated Google Generative AI (Gemini) to generate interview questions and concept explanations with prompt templates. See AI integration: [`generateInterviewQuestion`](server/controllers/aiController.js), [`generateConceptExplanation`](server/controllers/aiController.js) and prompts: [server/utils/prompts.js](server/utils/prompts.js).
- Designed normalized MongoDB schemas and relations: `User`, `Session`, `Question` with population and cascading delete behavior. See models: [server/models/user.js](server/models/user.js), [server/models/session.js](server/models/session.js), [server/models/question.js](server/models/question.js).
- Implemented session-level Q&A flows: create sessions with generated questions, add more questions, pin/unpin questions and update notes. See controllers: [`createSession`](server/controllers/sessionController.js), [`addQuestionsToSession`](server/controllers/questionController.js), [`togglePinQuestion`](server/controllers/questionController.js), [`updateQuestionNote`](server/controllers/questionController.js).
- Built a production-friendly React frontend with Context-based auth, Axios instance with interceptors, reusable UI components, code syntax-highlighting and markdown rendering. See client entry: [Client/src/main.jsx](Client/src/main.jsx), context: [`UserProvider`](Client/src/context/UserContext.jsx), axios wrapper: [Client/src/utils/axiosInstance.js](Client/src/utils/axiosInstance.js).
- Clean, componentized frontend UI using Tailwind CSS, Framer Motion animations and accessible modal/drawer patterns. Example components: [Client/src/components/Modal.jsx](Client/src/components/Modal.jsx), [Client/src/components/Drawer.jsx](Client/src/components/Drawer.jsx), and layout: [Client/src/components/Layouts/DashboardLayout.jsx](Client/src/components/Layouts/DashboardLayout.jsx).
- Implemented client-side AI UX: question cards, expand/collapse previews, code copy and highlight via React Syntax Highlighter and markdown rendering. See [Client/src/Pages/InterviewPrep/components/AIResponsePreview.jsx](Client/src/Pages/InterviewPrep/components/AIResponsePreview.jsx) and [Client/src/components/Cards/QuestionCard.jsx](Client/src/components/Cards/QuestionCard.jsx).

---

## Architecture Overview

- Backend: Express server with modular controllers, routes and middlewares.
  - Server bootstrap: [server/server.js](server/server.js)
  - DB connect: [server/config/db.js](server/config/db.js)
  - Routes: [server/routes/authRoutes.js](server/routes/authRoutes.js), [server/routes/sessionRoutes.js](server/routes/sessionRoutes.js), [server/routes/questionRoutes.js](server/routes/questionRoutes.js), [server/routes/aiRoutes.js](server/routes/aiRoutes.js)
  - Controllers: [server/controllers/authController.js](server/controllers/authController.js), [server/controllers/sessionController.js](server/controllers/sessionController.js), [server/controllers/questionController.js](server/controllers/questionController.js), [server/controllers/aiController.js](server/controllers/aiController.js)
  - Middlewares: [`protect` JWT auth middleware](server/middlewares/authMiddleware.js), [upload middleware (Multer)](server/middlewares/uploadMiddleware.js)
  - Prompt templates: [server/utils/prompts.js](server/utils/prompts.js)

- Frontend: React (Vite) app with Context, Axios instance and modular pages/components.
  - App entry: [Client/src/App.jsx](Client/src/App.jsx)
  - Auth & state: [`UserProvider`](Client/src/context/UserContext.jsx)
  - API paths: [Client/src/utils/apiPath.js](Client/src/utils/apiPath.js)
  - Reusable utils: [Client/src/utils/axiosInstance.js](Client/src/utils/axiosInstance.js), [Client/src/utils/uploadImage.js](Client/src/utils/uploadImage.js)
  - Pages: Landing ([Client/src/Pages/LandingPage.jsx](Client/src/Pages/LandingPage.jsx)), Dashboard ([Client/src/Pages/Home/Dashboard.jsx](Client/src/Pages/Home/Dashboard.jsx)), Interview prep ([Client/src/Pages/InterviewPrep/InterviewPrep.jsx](Client/src/Pages/InterviewPrep/InterviewPrep.jsx)), Auth pages ([Client/src/Pages/Auth/Login.jsx](Client/src/Pages/Auth/Login.jsx), [Client/src/Pages/Auth/Signup.jsx](Client/src/Pages/Auth/Signup.jsx)).

---

## Core Features (What it does)

- Auth: register/login with hashed passwords + JWT token generation via [`generateToken`](server/controllers/authController.js) and protected endpoints via [`protect`](server/middlewares/authMiddleware.js).
- AI question generation: call to Google GenAI SDK in [`generateInterviewQuestion`](server/controllers/aiController.js) using prompts in [server/utils/prompts.js](server/utils/prompts.js).
- Session lifecycle: create a session with AI-generated Q&A ([`createSession`](server/controllers/sessionController.js)), list user sessions ([`getMySessions`](server/controllers/sessionController.js)), view session details and associated questions ([`getSessionById`](server/controllers/sessionController.js)), delete session with cascade delete on questions ([`deleteSession`](server/controllers/sessionController.js)).
- Question management: add generated questions to existing sessions ([`addQuestionsToSession`](server/controllers/questionController.js)), pin/unpin and update personal notes on questions.
- Profile image upload: client posts multipart/form-data to route in [server/routes/authRoutes.js](server/routes/authRoutes.js), file handling in [server/middlewares/uploadMiddleware.js](server/middlewares/uploadMiddleware.js), static serve via `app.use('/uploads', express.static(...))` in [server/server.js](server/server.js).
- Frontend UX: markdown + syntax-highlighted answers ([Client/src/Pages/InterviewPrep/components/AIResponsePreview.jsx](Client/src/Pages/InterviewPrep/components/AIResponsePreview.jsx)), reusable session cards and drawer for detailed explanations.

---

## Tech Stack (Resume-ready terminology)

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT (jsonwebtoken), bcryptjs, Multer
  - Google Generative AI SDK: `@google/genai` (Gemini model usage) — integrated in [server/controllers/aiController.js](server/controllers/aiController.js)
- Frontend: React (17+ / React 19 in package.json), Vite, Tailwind CSS, Framer Motion, React Router, Axios
- Features & tools: React Context API, Axios interceptors ([Client/src/utils/axiosInstance.js](Client/src/utils/axiosInstance.js)), Markdown rendering + syntax highlighting, responsive components
- Dev & infra: nodemon (dev), dotenv for env vars, CORS handling

---

## Environment Variables

Create a `.env` in `/server` with (as used in code):
- `MONGO_URI` — MongoDB connection string ([used in server/config/db.js](server/config/db.js))
- `JWT_SECRET` — secret for signing JWTs ([used in server/middlewares/authMiddleware.js](server/middlewares/authMiddleware.js) & [`generateToken`](server/controllers/authController.js))
- `GOOGLE_API_KEY` — API key for Google GenAI (`@google/genai`) used in [server/controllers/aiController.js](server/controllers/aiController.js)
- `PORT` — optional server port (default in [server/server.js](server/server.js))

Note: earlier docs reference `GEMINI_API_KEY` — the code expects `GOOGLE_API_KEY`.

---

## Quick Start

1. Server
   - cd into server: `cd server`
   - install: `npm install`
   - create `.env` with variables above
   - run (dev): `npm run dev` (uses `nodemon`; entry [server/server.js](server/server.js))

2. Client
   - cd into client: `cd Client`
   - install: `npm install`
   - run: `npm run dev` (Vite; entry [Client/src/main.jsx](Client/src/main.jsx))

3. Open the app
   - Frontend default: Vite will provide a local port (e.g., `localhost:5173`) — API base is set in [Client/src/utils/apiPath.js](Client/src/utils/apiPath.js) as `BASE_URL = "http://localhost:8000"`; ensure the server port and `BASE_URL` match or update `BASE_URL` to the server host/port.

---

## Important Files & Symbols (navigate quickly)

- Server entry: [server/server.js](server/server.js)
- DB connect: [server/config/db.js](server/config/db.js)
- Auth routes & handlers:
  - Routes: [server/routes/authRoutes.js](server/routes/authRoutes.js)
  - Handlers: [`registerUser`](server/controllers/authController.js), [`loginUser`](server/controllers/authController.js), [`getUserProfile`](server/controllers/authController.js)
- AI:
  - Routes: [server/routes/aiRoutes.js](server/routes/aiRoutes.js)
  - Handlers: [`generateInterviewQuestion`](server/controllers/aiController.js), [`generateConceptExplanation`](server/controllers/aiController.js)
  - Prompts: [server/utils/prompts.js](server/utils/prompts.js)
- Session & question management:
  - Routes: [server/routes/sessionRoutes.js](server/routes/sessionRoutes.js), [server/routes/questionRoutes.js](server/routes/questionRoutes.js)
  - Controllers: [`createSession`](server/controllers/sessionController.js), [`getMySessions`](server/controllers/sessionController.js), [`getSessionById`](server/controllers/sessionController.js), [`deleteSession`](server/controllers/sessionController.js), [`addQuestionsToSession`](server/controllers/questionController.js), [`togglePinQuestion`](server/controllers/questionController.js), [`updateQuestionNote`](server/controllers/questionController.js)
- Models:
  - [server/models/user.js](server/models/user.js)
  - [server/models/session.js](server/models/session.js)
  - [server/models/question.js](server/models/question.js)
- Frontend:
  - App root: [Client/src/App.jsx](Client/src/App.jsx)
  - Auth context: [`UserProvider`](Client/src/context/UserContext.jsx)
  - Axios wrapper: [Client/src/utils/axiosInstance.js](Client/src/utils/axiosInstance.js)
  - API endpoints path map: [Client/src/utils/apiPath.js](Client/src/utils/apiPath.js)
  - Key pages: [Client/src/Pages/Home/Dashboard.jsx](Client/src/Pages/Home/Dashboard.jsx), [Client/src/Pages/InterviewPrep/InterviewPrep.jsx](Client/src/Pages/InterviewPrep/InterviewPrep.jsx), [Client/src/Pages/LandingPage.jsx](Client/src/Pages/LandingPage.jsx)
  - Key UI components: [Client/src/components/Modal.jsx](Client/src/components/Modal.jsx), [Client/src/components/Drawer.jsx](Client/src/components/Drawer.jsx), [Client/src/components/Cards/QuestionCard.jsx](Client/src/components/Cards/QuestionCard.jsx), [Client/src/Pages/InterviewPrep/components/AIResponsePreview.jsx](Client/src/Pages/InterviewPrep/components/AIResponsePreview.jsx)

---

## Notes & Suggested Resume Phrases

- "Designed and implemented a full-stack MERN application that integrates Google Gemini for dynamic content generation and stores session-based Q&A with MongoDB relations."
- "Built secure authentication with JWT, password hashing (bcrypt), and protected Express routes; implemented media upload pipeline using Multer and served static assets."
- "Implemented frontend state management using React Context, global axios interceptors, markdown rendering and performant UI using TailwindCSS and Framer Motion."
- "Authored prompt templates and logic for safe parsing of model responses and integrated Google GenAI SDK."

---

## Next Improvements (optional)

- Add server-side validation (e.g., Joi) and request schema validation.
- Add unit & integration tests (Jest / Supertest).
- Harden AI response parsing with safer sanitization and fallback flows.
- Centralize environment config and Dockerize both services for parity in dev/prod.

---

If you want, I can:
- produce a cleaned README.md file (ready-to-save) with the content above,
- or generate a one-page bullet summary tailored to a CV using exact tech keywords.
