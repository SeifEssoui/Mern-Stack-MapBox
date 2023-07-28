const mongoose = require('mongoose');

const itineraireSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  busStations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusStation' }],
  // Add any other relevant fields for your itinéraires
  //ordres _id station with in the busstation table 
});

const Itineraire = mongoose.model('Itineraire', itineraireSchema);

module.exports = Itineraire;


// TWO VIEWS Iteneraires mapbox geocoder 