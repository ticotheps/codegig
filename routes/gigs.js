const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

router.get('/', (req, res) => {
    // Test route with:
    // res.send('GIGS');

    Gig.findAll() // <- returns a promise, so much use .then() and .catch() statements
        .then(gigs => {
            console.log(gigs);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
        });

});

module.exports = router;