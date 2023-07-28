const mongoose = require('mongoose');

const busStationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  // Add any other relevant fields for your bus stations
});

const BusStation = mongoose.model('BusStation', busStationSchema);

module.exports = BusStation;
