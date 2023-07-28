
const BusStation = require('../models/BusStation');

// Controller function to create a new bus station (admin access)
exports.createBusStation = async (req, res) => {
  try {
    const { name, location } = req.body;

    // Check if a bus station with the same name already exists
    const existingStation = await BusStation.findOne({ name });
    if (existingStation) {
      return res.status(400).json({ error: 'A bus station with this name already exists' });
    }

    // Create a new bus station with the provided data
    const newStation = new BusStation({ name, location });

    // Save the bus station to the database
    await newStation.save();

    res.status(201).json({ message: 'Bus station created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the bus station' });
  }
};

// Controller function to get a list of all bus stations
exports.getAllBusStations = async (req, res) => {
  try {
    const allStations = await BusStation.find();
    res.status(200).json(allStations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all bus stations' });
  }
};

// Controller function to get a bus station by ID
exports.getBusStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await BusStation.findById(id);

    if (!station) {
      return res.status(404).json({ error: 'Bus station not found' });
    }

    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the bus station' });
  }
};

// Controller function to update a bus station by ID (admin access)
exports.updateBusStation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedStation = await BusStation.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedStation) {
      return res.status(404).json({ error: 'Bus station not found' });
    }

    res.status(200).json(updatedStation);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the bus station' });
  }
};

// Controller function to delete a bus station by ID (admin access)
exports.deleteBusStation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStation = await BusStation.findByIdAndDelete(id);

    if (!deletedStation) {
      return res.status(404).json({ error: 'Bus station not found' });
    }

    res.status(200).json({ message: 'Bus station deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the bus station' });
  }
};
