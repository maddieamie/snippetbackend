'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const verifyUser = require('./functionmodules/authorize.js');
const Themer = require('./functionmodules/Themer.js');
const Fetcher = require('./functionmodules/Fetcher.js');
const PoemHandler = require('./functionmodules/PoemHandler.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3046;

const username = process.env.username;
const password = process.env.password;
const clusterName = process.env.clusterName;
mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.wopnada.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error to MDB'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res, next) => res.status(200).send('Default Route working'));

// <------ Express route functions ----->

const arouter = express.Router();

// <--- Verify user functions --->
// Apply verifyUser middleware only to routes that require authorization
arouter.use(verifyUser);

function handleGetUser(req, res) {
    console.log('Getting the user');
    res.send(req.user);
}

arouter.get('/user', handleGetUser);

// <------ Theme requests ------- >
// Apply verifyUser middleware only to routes that require authorization
arouter.post('/generate-theme', Themer.makeTheme);
arouter.get('/fetch-theme', Themer.fetchTheme)

app.get('/get-themes', Themer.fetchTheme);
app.get('/get-all-themes', Themer.fetchAllThemes);
app.get('/get-witchy', Fetcher.fetchWitchy);
app.get('/get-seattle', Fetcher.fetchSeattle);
app.get('/get-bb', Fetcher.fetchBB);
app.get('/get-lgbt', Fetcher.fetchlgbt);
app.get('/get-RP', Fetcher.fetchRP);

// <--------- User Poem Requests ---------------->
arouter.get('/poems', PoemHandler.getPoems);
arouter.post('/poems', PoemHandler.postPoems);
arouter.delete('/poems/:id', PoemHandler.deletePoems);
arouter.put('/poems/:id', PoemHandler.putPoems);


app.use(arouter); // Use the arouter after defining routes

app.get('*', (req, res, next) => res.status(404).send('Resource not Found'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT`);
});
