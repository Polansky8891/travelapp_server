const express = require('express');
const router = express.Router();
const cityModel = require('../model/cityModel')


/* get all cities */
router.get('/all', async (req, res) => {
    try {
        const cities = await cityModel.find();
        res.status(200).json(cities); 
    } catch (err) {
        console.error('Error fetching cities:', err); 
        res.status(500).json({ error: 'Failed to fetch cities. Please try again later.' });
    }
});

/* add new cities */
router.post('/', (req, res) => {
    const nuevaCiudad = new cityModel({
        name: req.body.name,
        country: req.body.country
    });

    nuevaCiudad.save()
        .then(ciudad => {
            res.send(ciudad);
        })
        .catch(err => {
            res.status(500).send('Server error');
        });
});


module.exports = router;