'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

const getMovies = require('./movies');
const getWeather = require('./weather');

app.get('/', (request, response) => {
  response.status(200).send('King Snorlax Approves');
});

app.get('/weather', getWeather);

app.get('/movie', getMovies);

// app.get('*', (request, response) => {
//   response.send('Snorlax rules');
// });



app.listen(PORT, () => console.log(`Jigglypuff loves ${PORT}`));
