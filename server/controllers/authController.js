const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In your generateToken.js file
const generateToken = (userId) => {
    // Create the payload with a 'user' object inside
    const payload = {
        user: {
            id: userId
        }
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register a new user
const registerUser = async (req, res) => {
    try{
        const { name, email, password , profileImageUrl} = req.body;
        // Check if user exists
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try{
         console.log('HIT: /api/auth/login route handler');
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // return user data and jwt token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get user profile (shld be private , need token)
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
