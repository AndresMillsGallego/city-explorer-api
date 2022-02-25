'use strict';

const axios = require('axios');

async function getMovies (request, response) {
  try {
    let searchQuery = request.query.searchQuery
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`

    const movieResponse = await axios.get(movieUrl);
    let movies = movieResponse.data.results.map((movie) => {
      return new Movie(movie);
    });
    response.send(movies);
  } catch (error) {
    response.status(500).send('There was a problem with the movies.')
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