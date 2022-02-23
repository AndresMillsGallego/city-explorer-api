'use strict';

require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

const PORT = process.env.PORT || 3002;

app.use(cors());

let weatherData = require('./data/weather.json');

app.get('/weather', (request, response) => {
  try {
    let city = request.query.city;
    // let lat = request.query.lat;
    // let lon = request.query.lon;

    let selectedCity = weatherData.find(obj => obj.city_name.toLowerCase() === city.toLowerCase());
    let cityObj = selectedCity.data.map(day => {
      return new Forecast(day);
    });

    response.send(cityObj);

  } catch (error) {
    response.status(500).send('Jigglypuff has sang a song, now you are asleep');
  }
});

app.get('*', (request, response) => {
  response.send('Snorlax rules');
});

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}


app.listen(PORT, () => console.log(`Jigglypuff loves ${PORT}`));
