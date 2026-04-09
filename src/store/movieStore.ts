import { create } from 'zustand'
import type { Movie, MovieDetails } from '../api/types'

interface MovieStore {
  nowPlaying: Movie[]
  upcoming: Movie[]
  popular: Movie[]
  movieDetails: Record<number, MovieDetails>

  setNowPlaying: (movies: Movie[]) => void
  setUpcoming: (movies: Movie[]) => void
  setPopular: (movies: Movie[]) => void
  setMovieDetails: (id: number, details: MovieDetails) => void
}

export const useMovieStore = create<MovieStore>((set) => ({
  nowPlaying: [],
  upcoming: [],
  popular: [],
  movieDetails: {},

  setNowPlaying: (movies) => set({ nowPlaying: movies }),
  setUpcoming: (movies) => set({ upcoming: movies }),
  setPopular: (movies) => set({ popular: movies }),
  setMovieDetails: (id, details) =>
    set((state) => ({ movieDetails: { ...state.movieDetails, [id]: details } })),
}))
