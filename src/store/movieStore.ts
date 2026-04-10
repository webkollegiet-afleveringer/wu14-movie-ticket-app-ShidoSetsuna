import { create } from 'zustand'
import type { Movie, MovieDetails, Genre } from '../api/types'
import type { Credits, MovieImages } from '../api/tmdb'

interface MovieStore {
  nowPlaying: Movie[]
  upcoming: Movie[]
  releasingSoon: Movie[]
  popular: Movie[]
  movieDetails: Record<number, MovieDetails>
  movieCredits: Record<number, Credits>
  movieImages: Record<number, MovieImages>
  similarMovies: Record<number, Movie[]>
  genres: Genre[]

  setNowPlaying: (movies: Movie[]) => void
  setUpcoming: (movies: Movie[]) => void
  setReleasingSoon: (movies: Movie[]) => void
  setPopular: (movies: Movie[]) => void
  setMovieDetails: (id: number, details: MovieDetails) => void
  setMovieCredits: (id: number, credits: Credits) => void
  setMovieImages: (id: number, images: MovieImages) => void
  setSimilarMovies: (id: number, movies: Movie[]) => void
  setGenres: (genres: Genre[]) => void
}

export const useMovieStore = create<MovieStore>((set) => ({
  nowPlaying: [],
  upcoming: [],
  releasingSoon: [],
  popular: [],
  movieDetails: {},
  movieCredits: {},
  movieImages: {},
  similarMovies: {},
  genres: [],

  setNowPlaying: (movies) => set({ nowPlaying: movies }),
  setUpcoming: (movies) => set({ upcoming: movies }),
  setReleasingSoon: (movies) => set({ releasingSoon: movies }),
  setPopular: (movies) => set({ popular: movies }),
  setMovieDetails: (id, details) =>
    set((state) => ({ movieDetails: { ...state.movieDetails, [id]: details } })),
  setMovieCredits: (id, credits) =>
    set((state) => ({ movieCredits: { ...state.movieCredits, [id]: credits } })),
  setMovieImages: (id, images) =>
    set((state) => ({ movieImages: { ...state.movieImages, [id]: images } })),
  setSimilarMovies: (id, movies) =>
    set((state) => ({ similarMovies: { ...state.similarMovies, [id]: movies } })),
  setGenres: (genres) => set({ genres }),
}))
