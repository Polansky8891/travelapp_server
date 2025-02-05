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

const db = 'mongodb+srv://pol8891:dw5gVQGkXuKZwsR7@cluster0.9rxpz.mongodb.net/MYtinerary?retryWrites=true&w=majority';

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

app.post('/cities/add', async (req, res) => {
  try {
    console.log("Received data:", req.body);
    
    const newCity = new cityModel({
      name: req.body.name,
      country: req.body.country
    });

    await newCity.save();
    res.status(201).json({ message: "City added successfully", city: newCity });
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).json({ error: "Failed to add city", details: error.message });
  }
});

app.post('/itineraries/add', async (req, res) => {
  try {
    console.log("Received data:", req.body);
    
    const newItinerary = new itineraryModel({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      city: req.body.city,
      country: req.body.country,
      days: req.body.days,
      type: req.body.type,
      difficulty: req.body.difficulty,
      price: req.body.price
    });

    await newItinerary.save();
    res.status(201).json({ message: "Itinerary added successfully", itinerary: newItinerary });
  } catch (error) {
    console.error("Error adding itinerary:", error);
    res.status(500).json({ error: "Failed to add itinerary", details: error.message });
  }
});

app.delete('/itineraries/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItinerary = await itineraryModel.findByIdAndDelete(id);
    
    if (!deletedItinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    
    res.status(200).json({ message: "Itinerary deleted successfully", itinerary: deletedItinerary });
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    res.status(500).json({ error: "Failed to delete itinerary", details: error.message });
  }
});
