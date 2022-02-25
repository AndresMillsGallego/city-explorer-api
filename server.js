'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

const getMovies = require('./movies');

app.get('/', (request, response) => {
  response.status(200).send('King Snorlax Approves');
});

app.get('/weather', async (request, response) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    let weatherData = await axios.get(weatherUrl);
    
    let cityObj = weatherData.data.data.map(day => {
      return new Forecast(day);
    })
    response.send(cityObj);
  } catch (error) {
    response.status(500).send('Jigglypuff has sang a song, now you are asleep')
  }
});

app.get('/movie', getMovies);

// app.get('*', (request, response) => {
//   response.send('Snorlax rules');
// });

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

app.listen(PORT, () => console.log(`Jigglypuff loves ${PORT}`));
