const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


// Database
const db = require('./config/database');

// Tests DB
db.authenticate()
    .then(() => {
        console.log('Connection to PostgreSQL DB has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const app = express();

// Creates middleware to use Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set static folder (public)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('INDEX');
});

// Gig Routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));