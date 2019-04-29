const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

router.get('/', (req, res) => {
    // res.send('GIGS');

    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
        });

});

module.exports = router;