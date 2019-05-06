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

// POST REQUEST (add a gig)
router.get("/add", (req, res) => {
    // data to be added to the DB
  const data = {
    title: "Simple Wordpress Website",
    technologies: "wordpress, php, html, css",
    budget: "$1000",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
       enim ad minim veniam, quis nostrud exercitation ullamco laboris 
       nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
       in reprehenderit in voluptate velit esse cillum dolore eu 
       fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
       proident, sunt in culpa qui officia deserunt mollit anim id est 
       laborum.`,
    contact_email: "user2@gmail.com"
  };

  // destructuring the 'data' object
  let { title, technologies, budget, description, contact_email } = data;

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
