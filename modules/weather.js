'use strict';

const axios = require('axios');
let cache = require('./cache');

function getWeather(lat, lon) {
  const key = 'weather-' + lat + lon;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  let oneDay = 1000 * 60 * 60 *24;

  if (cache[key] && (Date.now() - cache[key].timestamp < oneDay)) {
    console.log('Cache Hit, What\'s the Weather Like?');
  } else {
    console.log('Cache Miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(weatherUrl)
      .then(response => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Weather Forecast: ${day.weather.description}`;
  }
}

module.exports = getWeather;
