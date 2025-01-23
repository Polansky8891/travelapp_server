const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const citiesRouter = require('./routes/cities');
const mongoose = require('mongoose');
const itinerariesRouter = require('./routes/itineraries');
const cityModel = require('./model/cityModel');
const itineraryModel = require('./model/itineraryModel');

const app = express();
const port = 5000;



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());



app.use('/cities', citiesRouter);
app.use('/itineraries', itinerariesRouter);

const db = 'mongodb+srv://pol8891:Mutenroshi8891...@cluster0.9rxpz.mongodb.net/MYtinerary?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));




  app.get('/cities/all', async (req, res) => {
    try {
      const cities = await cityModel.find();
      res.status(200).json(cities); 
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cities.' });
    }
  });

  app.get('/itineraries/all', async (req, res) => {
    try {
      const itineraries = await itineraryModel.find();
      res.status(200).json(itineraries); 
    } catch (error) {
      res.status(500).json({ error: 'Error fetching itineraries.' });
    }
  });


  