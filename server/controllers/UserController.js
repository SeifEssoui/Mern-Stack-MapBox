const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();


// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

// Controller function to handle user login
// Controller function to handle user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Email:", email);
    console.log("Login Password:", password);

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Ensure that the user object has a tokens property before pushing the token
    if (!user.tokens) {
      user.tokens = [];
    }

    // Save the token in the user's tokens array (if you want to support multiple login sessions)
    user.tokens.push({ token });
    await user.save();

    // Return the token and user data
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};



// Controller function to get the authenticated user's profile
exports.getUserProfile = async (req, res) => {
  try {
    // The authenticated user's details are available in the req.user object (from authentication middleware)
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
};

// Controller function to get a user's details by ID (admin access)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};

// Controller function to update a user's profile by ID (admin access)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Ensure that the user type cannot be updated through this route
    if (updates.userType) {
      delete updates.userType;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

// Controller function to delete a user by ID (admin access)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

// Controller function to get a list of all users (admin access)
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all users' });
  }
};
