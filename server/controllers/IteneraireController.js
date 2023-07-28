const Itineraire = require('../models/Iteneraire');

// Controller function to create a new itinéraire (admin access)
exports.createItineraire = async (req, res) => {
  try {
    const { name, description, busStations } = req.body;

    // Check if an itinéraire with the same name already exists
    const existingItineraire = await Itineraire.findOne({ name });
    if (existingItineraire) {
      return res.status(400).json({ error: 'An itinéraire with this name already exists' });
    }

    // Create a new itinéraire with the provided data
    const newItineraire = new Itineraire({ name, description, busStations });

    // Save the itinéraire to the database
    await newItineraire.save();

    res.status(201).json({ message: 'Itinéraire created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the itinéraire' });
  }
};

// Controller function to get a list of all itinéraires
exports.getAllItineraires = async (req, res) => {
  try {
    const allItineraires = await Itineraire.find();
    res.status(200).json(allItineraires);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all itinéraires' });
  }
};

// Controller function to get an itinéraire by ID
exports.getItineraireById = async (req, res) => {
  try {
    const { id } = req.params;
    const itineraire = await Itineraire.findById(id).populate('busStations');

    if (!itineraire) {
      return res.status(404).json({ error: 'Itinéraire not found' });
    }

    res.status(200).json(itineraire);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the itinéraire' });
  }
};

// Controller function to update an itinéraire by ID (admin access)
exports.updateItineraire = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedItineraire = await Itineraire.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedItineraire) {
      return res.status(404).json({ error: 'Itinéraire not found' });
    }

    res.status(200).json(updatedItineraire);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the itinéraire' });
  }
};

// Controller function to delete an itinéraire by ID (admin access)
exports.deleteItineraire = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItineraire = await Itineraire.findByIdAndDelete(id);

    if (!deletedItineraire) {
      return res.status(404).json({ error: 'Itinéraire not found' });
    }

    res.status(200).json({ message: 'Itinéraire deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the itinéraire' });
  }
};
