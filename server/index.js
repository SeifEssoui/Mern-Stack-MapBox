const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add the body-parser package for parsing incoming requests
const cors = require('cors'); 
const userRoutes = require('./routes/UserRoute');
const itineraireRoutes = require('./routes/itineraireRoutes');
const busStationRoutes = require('./routes/busStationRoutes');



dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
/*   res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  ); */
  next();
});

app.use(express.json({ limit: '10mb' }));




// Use the routes
app.use('/api', userRoutes);
app.use('/api', itineraireRoutes);
app.use('/api', busStationRoutes);
const startServer = async () => {
  try {
    mongoose.set('strictQuery', false); // or mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_CONNECT);
    app
      .listen(port, () => console.log(`Server is listening on port: ${port}`))
      .on('error', (e) => {
        console.log('Error happened: ', e.message);
      });
  } catch (error) {
    console.log(error);
  }
};

startServer();
