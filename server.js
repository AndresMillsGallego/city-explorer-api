'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const getMovies = require('./modules/movies');
const getWeather = require('./modules/weather');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('King Snorlax Approves');
});

app.get('/weather', weatherHandler);
app.get('/movie', getMovies);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.log(error);
      response.status(200).send('Sorry about that, something went wrong.');
    });

}



app.listen(PORT, () => console.log(`Jigglypuff loves ${PORT}`));
