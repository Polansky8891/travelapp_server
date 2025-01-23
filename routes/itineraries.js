
const express = require('express');
const router = express.Router();
const itineraryModel = require('../model/itineraryModel')


/* get all itineraries */
router.get('/all', async (req, res) => {
    try {
        const itineraries = await itineraryModel.find();
        res.status(200).json(itineraries); 
    } catch (err) {
        console.error('Error fetching itineraries:', err); 
        res.status(500).json({ error: 'Failed to fetch itineraries. Please try again later'})
    }
});

/* add new itineraries */
router.post('/', (req, res) => {
    const nuevoItinerario = new itineraryModel({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        city: req.body.city,
        country: req.body.country,
        days: req.body.days,
        type: req.body.type,
        difficulty: req.body.difficulty,
        price: req.body.price
    });

    nuevoItinerario.save()
        .then(itinerario => {
            res.send(itinerario);
        })
        .catch(err => {
            res.status(500).send('Server error');
        });
});


module.exports = router;