const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware function to authenticate user using JWT
exports.authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the request header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token
    const decodedToken = jwt.verify(token, 'your_secret_key'); // Replace with your actual secret key used to sign tokens

    // Find the user using the token's decoded payload (userID)
    const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token });

    if (!user) {
      throw new Error(); // User not found or token not valid
    }

    // Attach the authenticated user object to the request for future use in the controllers
    req.user = user;
    req.token = token;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized access' });
  }
};

// Middleware function to check if the authenticated user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.user.userType === 'admin') {
    next(); // Allow access to the next middleware or route handler (admin access)
  } else {
    res.status(403).json({ error: 'You do not have permission to perform this action' });
  }
};
