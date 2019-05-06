const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");

// GET REQUEST (gig list)
router.get("/", (req, res) => {
  // Test route with:
  // res.send('GIGS');

  Gig.findAll() // <- returns a promise, so must use .then() and .catch() statements to handle promise
    .then(gigs => {
      res.render('gigs', {
        gigs:gigs
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// POST REQUEST (add a gig to the DB)
router.post("/add", (req, res) => {
    // data to be added to the DB
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = []; // initializes an 'errors' array

  // Validates Fields
  if(!title) {
    errors.push({ text: 'Please add a title'})
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies'})
  }
  if(!description) {
    errors.push({ text: 'Please add a description'})
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email'})
  }

  Gig.create({
      title: title,
      technologies: technologies,
      budget: budget,
      description: description, 
      contact_email: contact_email
  })
  .then(gig => res.redirect('/gigs'))
  .catch(err => console.log(err));
});

module.exports = router;
