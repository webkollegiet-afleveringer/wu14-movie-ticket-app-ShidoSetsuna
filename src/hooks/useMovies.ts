import { useEffect, useState } from 'react'
import { tmdb } from '../api/tmdb'
import { useMovieStore } from '../store/movieStore'

const useFetchState = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  return { loading, setLoading, error, setError }
}

export const useNowPlaying = () => {
  const { nowPlaying, setNowPlaying } = useMovieStore()
  const { loading, setLoading, error, setError } = useFetchState()

  useEffect(() => {
    if (nowPlaying.length > 0) return // already cached
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
  const { loading, setLoading, error, setError } = useFetchState()

  useEffect(() => {
    if (upcoming.length > 0) return // already cached
    setLoading(true)
    tmdb.getUpcoming()
      .then(res => setUpcoming(res.results))
      .catch(() => setError('Failed to load upcoming'))
      .finally(() => setLoading(false))
  }, [])

  return { movies: upcoming, loading, error }
}

export const usePopular = () => {
  const { popular, setPopular } = useMovieStore()
  const { loading, setLoading, error, setError } = useFetchState()

  useEffect(() => {
    if (popular.length > 0) return // already cached
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
  const { loading, setLoading, error, setError } = useFetchState()

  useEffect(() => {
    if (movieDetails[id]) return // already cached
    setLoading(true)
    tmdb.getMovieDetails(id)
      .then(res => setMovieDetails(id, res))
      .catch(() => setError('Failed to load movie details'))
      .finally(() => setLoading(false))
  }, [id])

  return { movie: movieDetails[id] ?? null, loading, error }
}
