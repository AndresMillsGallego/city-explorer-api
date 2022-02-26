'use strict';

const axios = require('axios');
let cache = require('./cache');

async function getMovies(request, response) {
  let key = 'Moves-' + searchQuery;
  let searchQuery = request.query.searchQuery;
  let oneWeek = 1000 * 60 * 60 * 24 * 7;
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  try {
    if (cache[key] && (Date.now() - cache[key].timestamp < (oneWeek * 2))) {
      console.log('Cache Hit, Movie Time!');
      response.status(200).send(cache[key].data);
    } else {
      const movieResponse = await axios.get(movieUrl);
      let movies = movieResponse.data.results.map((movie) => {
        return new Movie(movie);
      });
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = movies;

      response.send(movies);
    }
  } catch (error) {
    response.status(500).send('There was a problem with the movies.');
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.description = movie.overview;
    this.releaseDate = movie.release_date;
  }
}

module.exports = getMovies;
