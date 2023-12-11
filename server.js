'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//const verifyUser= require('./functionmodules/authorize.js');
const Themer = require('./functionmodules/Themer.js');
const Fetcher = require('./functionmodules/Fetcher.js');



const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3046;


const username=process.env.username;
const password=process.env.password;
const clusterName=process.env.clusterName; 
mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.wopnada.mongodb.net/?retryWrites=true&w=majority`);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error to MDB'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res, next) => res.status(200).send('Default Route working'));

//app.use(verifyUser);

/*app.get('/user', handleGetUser);
function handleGetUser(req, res) {
    console.log('Getting the user');
    res.send(req.user);
  }
*/
//<------ Theme requests ------- >

app.post('/generate-theme', Themer.makeTheme);
app.get('/get-themes', Themer.fetchTheme);
app.get('/get-all-themes', Themer.fetchAllThemes);
app.get('/get-Reg', Fetcher.fetchReg);
app.get('/get-Reg2', Fetcher.fetchReg2);
app.get('/get-RP', Fetcher.fetchRP);

//<--------- User Poem Requests ---------------->

/*
app.get('/poems', PoemHandler.getPoems);
app.post('/poems', PoemHandler.postPoems);
app.delete('/poems/:id', PoemHandler.deletePoems);
app.put('/poems/:id', PoemHandler.putPoems);
//app.get('/user', handleGetUser); */

/*
function handleGetUser(req, res) {
    console.log('Getting the user');
    res.send(req.user);
  } */

app.get('*', (req, res, next) => res.status(404).send('Resource not Found'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT`);
});
