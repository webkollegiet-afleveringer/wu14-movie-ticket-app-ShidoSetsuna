import type { TMDBResponse, MovieDetails, Genre } from './types'

export interface Credits {
  crew: { job: string; name: string }[]
  cast: { name: string; character: string; profile_path: string | null }[]
}

export interface MovieImages {
  backdrops: { file_path: string }[]
  posters: { file_path: string }[]
}

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_API_TOKEN}`,
  'Content-Type': 'application/json',
}

const today = new Date().toISOString().split('T')[0]
const inThreeMonths = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

const upcomingBase = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_date.gte=${today}&primary_release_date.lte=${inThreeMonths}`

const filterPosters = (data: TMDBResponse): TMDBResponse => ({
  ...data,
  results: data.results.filter(m => m.poster_path !== null)
})

export const tmdb = {
  getNowPlaying: (): Promise<TMDBResponse> =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&region=DK`, { headers }).then(r => r.json()),

  getUpcoming: (): Promise<TMDBResponse> =>
    fetch(`${upcomingBase}&sort_by=popularity.desc`, { headers }).then(r => r.json()).then(filterPosters),

  getReleasingSoon: (): Promise<TMDBResponse> =>
    fetch(`${upcomingBase}&sort_by=primary_release_date.asc`, { headers })
      .then(r => r.json())
      .then(filterPosters)
      .then(data => ({
        ...data,
        results: [...data.results].sort((a, b) => {
          const dateDiff = new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
          if (dateDiff !== 0) return dateDiff
          return b.popularity - a.popularity
        })
      })),

  getPopular: (): Promise<TMDBResponse> =>
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&region=DK`, { headers }).then(r => r.json()),

  getMovieDetails: (id: number): Promise<MovieDetails> =>
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`, { headers }).then(r => r.json()),

  getMovieCredits: (id: number): Promise<Credits> =>
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, { headers }).then(r => r.json()),

  getMovieImages: (id: number): Promise<MovieImages> =>
    fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`, { headers }).then(r => r.json()),

  getSimilar: (id: number): Promise<TMDBResponse> =>
    fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`, { headers }).then(r => r.json()),

  getGenres: (): Promise<{ genres: Genre[] }> =>
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`, { headers }).then(r => r.json()),

  searchMovies: (query: string): Promise<TMDBResponse> =>
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`, { headers }).then(r => r.json()),
}
