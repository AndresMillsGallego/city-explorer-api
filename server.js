'use strict';

require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3002;

const cors = require('cors');
app.use(cors());

let weatherData = require('./data/weather.json');

app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  let cityLat = request.query.lat;
  let cityLon = request.query.lon;

  let weatherObj = weatherData.find(obj => obj.city_name.toLowerCase() === searchQuery);
  response.send(weatherObj, cityLat, cityLon);
});

app.get('*', (request, response) => {
  response.send('Snorlax rules');
});

class Forecast {
  constructor() {
    this.date = date;
    this.description = this.description;
  }
}


app.listen(PORT, () => console.log(`Jigglypuff loves ${PORT}`));
