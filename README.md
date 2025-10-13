## ----------PROPREP-AI ---------- ##

## Client - 
( path / folder setup ) . 
- src
  - assets
        |- hero-img
  - components
        | - Cards
        | - Inputs
               | - input.jsx
               | - ProfilePhotoSelector.jsx
        |- Layouts
        |- Loaders
        |- modal.jsx
  - Context
        |- UserContext.jsx
  - Pages
        |- Auth
            |- Login.jsx
            |- Signup.jsx
        |- Home
            |- dashBoard.jsx
        |- interviewprep
            |- components
            |- interviewprep.jsx
        |- Landingpage.jsx
  - Utils
        |- apipath.js
        |- axiosinstance.js
        |- data.js
        |- helper.js
        |- uploadimage.js
  - app.jsx
  - index.css
  - main.jsx

  - Libraries used : 
    npm i react / react-router-dom / axios / luicide-react / framer-motion / tailwind css / react-syntax-highlighter .

- Process :  
-----------------------------------------------------------------------------------------------------------
## Server 
- nvm use node (to tell nvm to use the latest version of node ).
- npm init -y (get package.json with all other default values ).
- npm i express bcryptjs cors dotenv jsonwebtoken mongoose multer @google/genai . 
- npm i nodemon --save-dev
- node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" (used to create JWT_SECRET KEY ) . 

# project structure setup -

# implementation -
- built Schema for user , question , session . 
- build mongo connection with connection string in db.js .
- stored the credential of connection string .env .
- setup mongodb
      mongodb site -> sign in -> create new project -> create cluster -> copied connection string and pasted in .env file .
- created routes in server/js . 
- implemented routes in there specific files . (Routes/) .
- created a new register user , login user , get profile in the AuthController.js . 
- created a JWT_TOKEN n stored it in .env file . 
- created authMiddleware protect . 
- completed the register/login/profile sections . 
- tested with the postman . 

- fixed the issue abt jwt_token ,
   how to automate the postman to fetch the token itself from the local ? 
   Login -> scripts -> post-response -> then paste this js code (pm.collectionVariables.set("accessToken", pm.response.json().token);) . 
   then to authorization of GET method , select auth type as - Bearer token then token as {{accessToken}} . 

- created the uploadMiddleware & upload-image auth . (from postman u can add the image into the db/uploads) .

- created createSession, getMySessions, getSessionById, deleteSession .

## Note : 
- Problem: "Not authorized, no token" error.
- Reason: Your API route is protected. It needs a JWT token to work, but you didn't send one.
- Fix:
      Run your Login request to get a token , In the failing request, go to Authorization -> Bearer Token and set the token to {{accessToken}}.

- created addQuestionToSession , updateQuestionNote , togglePinQuestion .

- created aiRoutes - > generateInterviewQuestion , generateQuestionExplanation . 
- prompt.js -> to provide llm the prompt of how he shld generate . 
- generated api from gemini ai studio - gemini 2.0 flash lite .

-----------------------------------------completed server side view -------------------------------------------

## Client - 
- create api paths in apiPath.js , axiosInstance . 
- endpoint connection for login and signup . 
- building dashboard page . 
