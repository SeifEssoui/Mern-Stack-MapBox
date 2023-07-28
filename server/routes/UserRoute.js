const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlwares/authMiddleware');

// Public route for user registration
router.post('/register', userController.registerUser);

// Public route for user login
router.post('/login', userController.loginUser);

// Private route to get the authenticated user's profile
router.get('/profile', authMiddleware.authenticateUser, userController.getUserProfile);

// Private route to get all users (admin access)
router.get('/users', authMiddleware.authenticateUser, authMiddleware.isAdmin, userController.getAllUsers);

// Private route to get a user by ID (admin access)
router.get('/users/:id', authMiddleware.authenticateUser, authMiddleware.isAdmin, userController.getUserById);

// Private route to update a user by ID (admin access)
router.put('/users/:id', authMiddleware.authenticateUser, authMiddleware.isAdmin, userController.updateUser);

// Private route to delete a user by ID (admin access)
router.delete('/users/:id', authMiddleware.authenticateUser, authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
