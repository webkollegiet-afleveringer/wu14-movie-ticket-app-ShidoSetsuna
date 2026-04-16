export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: Genre[]
  tagline: string
}

export interface TMDBResponse {
  results: Movie[]
  page: number
  total_pages: number
  total_results: number
}
