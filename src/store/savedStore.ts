import { create } from 'zustand'
import type { MovieDetails } from '../api/types'

interface SavedStore {
  savedMovies: MovieDetails[]
  toggleSaved: (movie: MovieDetails) => void
  isSaved: (id: number) => boolean
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  savedMovies: [],

  toggleSaved: (movie) => {
    const already = get().savedMovies.some(m => m.id === movie.id)
    set({
      savedMovies: already
        ? get().savedMovies.filter(m => m.id !== movie.id)
        : [...get().savedMovies, movie]
    })
  },

  isSaved: (id) => get().savedMovies.some(m => m.id === id),
}))
