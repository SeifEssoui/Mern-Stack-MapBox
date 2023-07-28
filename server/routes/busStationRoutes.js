const express = require('express');
const router = express.Router();
const busStationController = require('../controllers/BusStationController');
const authMiddleware = require('../middlwares/authMiddleware');

// Private route to create a new bus station (admin access)
router.post('/bus-station', authMiddleware.authenticateUser, authMiddleware.isAdmin, busStationController.createBusStation);

// Public route to get all bus stations
router.get('/bus-station', busStationController.getAllBusStations);

// Public route to get a bus station by ID
router.get('/bus-station/:id', busStationController.getBusStationById);

// Private route to update a bus station by ID (admin access)
router.put('/bus-station/:id', authMiddleware.authenticateUser, authMiddleware.isAdmin, busStationController.updateBusStation);

// Private route to delete a bus station by ID (admin access)
router.delete('/bus-station/:id', authMiddleware.authenticateUser, authMiddleware.isAdmin, busStationController.deleteBusStation);

module.exports = router;
