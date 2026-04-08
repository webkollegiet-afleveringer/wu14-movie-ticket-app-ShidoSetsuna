const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_API_TOKEN}`,
  'Content-Type': 'application/json',
}

export const tmdb = {
  getNowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`, { headers }).then(r => r.json()),

  getUpcoming: () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`, { headers }).then(r => r.json()),

  getMovieDetails: (id: number) =>
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`, { headers }).then(r => r.json()),

  searchMovies: (query: string) =>
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`, { headers }).then(r => r.json()),
}
