import { apiKey } from '../api/apiKey';
import { setActiveUser } from '../actions'


export const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanMoviesData(data.results);
};

export const cleanMoviesData = async (movies) => {
  const cleanMovies = movies.map(movie => {
    const { movie_id, user_id, title, poster_path, release_date, vote_average, overview } = movie;
    const fullPosterPath = `https://image.tmdb.org/t/p/w200${poster_path}`
    return (
      {
        movie_id,
        user_id,
        title,
        poster_path: fullPosterPath,
        release_date,
        vote_average,
        overview
      }
    )
  })
  return cleanMovies
}

export const login = async ({ email, password }) => {
  const url = 'http://localhost:3000/api/users';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  });
  const user = await response.json();
  return { id: user.data.id, name: user.data.name }

};

export const signUp = async ({ userName, email, password }) => {
  try {
    const url = 'http://localhost:3000/api/users/new';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ name: userName, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    const user = await response.json();
    return { id: user.id, name: userName }


  } catch (error) {
    throw (console.log(error));
  }
};



