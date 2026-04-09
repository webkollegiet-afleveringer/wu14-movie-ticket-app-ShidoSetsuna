import { create } from 'zustand'
import type { Movie, MovieDetails, Genre } from '../api/types'

interface MovieStore {
  nowPlaying: Movie[]
  upcoming: Movie[]
  releasingSoon: Movie[]
  popular: Movie[]
  movieDetails: Record<number, MovieDetails>
  genres: Genre[]

  setNowPlaying: (movies: Movie[]) => void
  setUpcoming: (movies: Movie[]) => void
  setReleasingSoon: (movies: Movie[]) => void
  setPopular: (movies: Movie[]) => void
  setMovieDetails: (id: number, details: MovieDetails) => void
  setGenres: (genres: Genre[]) => void
}

export const useMovieStore = create<MovieStore>((set) => ({
  nowPlaying: [],
  upcoming: [],
  releasingSoon: [],
  popular: [],
  movieDetails: {},
  genres: [],

  setNowPlaying: (movies) => set({ nowPlaying: movies }),
  setUpcoming: (movies) => set({ upcoming: movies }),
  setReleasingSoon: (movies) => set({ releasingSoon: movies }),
  setPopular: (movies) => set({ popular: movies }),
  setMovieDetails: (id, details) =>
    set((state) => ({ movieDetails: { ...state.movieDetails, [id]: details } })),
  setGenres: (genres) => set({ genres }),
}))
