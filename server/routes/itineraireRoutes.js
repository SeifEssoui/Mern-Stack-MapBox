const express = require('express');
const router = express.Router();
const itineraireController = require('../controllers/IteneraireController');
const authMiddleware = require('../middlwares/authMiddleware');

// Private route to create a new itinéraire (admin access)
router.post('/itineraire', authMiddleware.authenticateUser, authMiddleware.isAdmin, itineraireController.createItineraire);

// Public route to get all itinéraires
router.get('/itineraire', itineraireController.getAllItineraires);

// Public route to get an itinéraire by ID
router.get('/itineraire/:id', itineraireController.getItineraireById);

// Private route to update an itinéraire by ID (admin access)
router.put('/itineraire/:id', authMiddleware.authenticateUser, authMiddleware.isAdmin, itineraireController.updateItineraire);

// Private route to delete an itinéraire by ID (admin access)
router.delete('/itineraire/:id', authMiddleware.authenticateUser, authMiddleware.isAdmin, itineraireController.deleteItineraire);

module.exports = router;
