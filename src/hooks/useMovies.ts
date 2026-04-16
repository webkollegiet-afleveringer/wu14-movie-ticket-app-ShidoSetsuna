import { useEffect, useState } from 'react'
import { tmdb } from '../api/tmdb'
import { useMovieStore } from '../store/movieStore'

export const useNowPlaying = () => {
  const { nowPlaying, setNowPlaying } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (nowPlaying.length > 0) return
    setLoading(true)
    tmdb.getNowPlaying()
      .then(res => setNowPlaying(res.results))
      .catch(() => setError('Failed to load now playing'))
      .finally(() => setLoading(false))
  }, [])

  return { movies: nowPlaying, loading, error }
}

export const useUpcoming = () => {
  const { upcoming, setUpcoming } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (upcoming.length > 0) return
    setLoading(true)
    tmdb.getUpcoming()
      .then(res => setUpcoming(res.results))
      .catch(() => setError('Failed to load upcoming'))
      .finally(() => setLoading(false))
  }, [])

  return { movies: upcoming, loading, error }
}

export const useReleasingSoon = () => {
  const { releasingSoon, setReleasingSoon } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (releasingSoon.length > 0) return
    setLoading(true)
    tmdb.getReleasingSoon()
      .then(res => setReleasingSoon(res.results))
      .catch(() => setError('Failed to load releasing soon'))
      .finally(() => setLoading(false))
  }, [])

  return { movies: releasingSoon, loading, error }
}

export const usePopular = () => {
  const { popular, setPopular } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (popular.length > 0) return
    setLoading(true)
    tmdb.getPopular()
      .then(res => setPopular(res.results))
      .catch(() => setError('Failed to load popular'))
      .finally(() => setLoading(false))
  }, [])

  return { movies: popular, loading, error }
}

export const useMovieDetails = (id: number) => {
  const { movieDetails, setMovieDetails } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (movieDetails[id]) return
    setLoading(true)
    tmdb.getMovieDetails(id)
      .then(res => setMovieDetails(id, res))
      .catch(() => setError('Failed to load movie details'))
      .finally(() => setLoading(false))
  }, [id])

  return { movie: movieDetails[id] ?? null, loading, error }
}

export const useMovieCredits = (id: number) => {
  const { movieCredits, setMovieCredits } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (movieCredits[id]) return
    setLoading(true)
    tmdb.getMovieCredits(id)
      .then(res => setMovieCredits(id, res))
      .catch(() => setError('Failed to load credits'))
      .finally(() => setLoading(false))
  }, [id])

  const director = movieCredits[id]?.crew.find(c => c.job === 'Director')?.name ?? null

  return { director, loading, error }
}

export const useMovieImages = (id: number) => {
  const { movieImages, setMovieImages } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (movieImages[id]) return
    setLoading(true)
    tmdb.getMovieImages(id)
      .then(res => setMovieImages(id, res))
      .catch(() => setError('Failed to load images'))
      .finally(() => setLoading(false))
  }, [id])

  return {
    backdrops: movieImages[id]?.backdrops ?? [],
    posters: movieImages[id]?.posters ?? [],
    loading,
    error
  }
}

export const useSimilarMovies = (id: number) => {
  const { similarMovies, setSimilarMovies } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (similarMovies[id]) return
    setLoading(true)
    tmdb.getSimilar(id)
      .then(res => setSimilarMovies(id, res.results))
      .catch(() => setError('Failed to load similar movies'))
      .finally(() => setLoading(false))
  }, [id])

  return { movies: similarMovies[id] ?? [], loading, error }
}

export const useGenres = () => {
  const { genres, setGenres } = useMovieStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (genres.length > 0) return
    setLoading(true)
    tmdb.getGenres()
      .then(res => setGenres(res.genres))
      .catch(() => setError('Failed to load genres'))
      .finally(() => setLoading(false))
  }, [])

  const getGenreName = (id: number): string =>
    genres.find(g => g.id === id)?.name ?? ''

  return { genres, getGenreName, loading, error }
}