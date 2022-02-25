'use strict';

const axios = require('axios');

async function getWeather (request, response) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    
    const weatherData = await axios.get(weatherUrl);
    let cityObj = weatherData.data.data.map(day => {
      return new Forecast(day);
    });
    response.send(cityObj);
  } catch (error) {
    response.status(500).send('There was a problem with the weather')
  }
}

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;