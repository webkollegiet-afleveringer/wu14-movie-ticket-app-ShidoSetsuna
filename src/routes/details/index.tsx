import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'
import Slider from '../../components/slider'
import MovieDetails from '../../components/movie-details'
import Button from '../../components/button'
import { IMAGE_BASE_URL } from '../../api/tmdb'
import { useMovieDetails, useMovieCredits, useMovieImages } from '../../hooks/useMovies'

export const Route = createFileRoute('/details/')({
  validateSearch: (search: Record<string, unknown>) => ({
    id: Number(search.id),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useSearch()
  const { movie, loading, error } = useMovieDetails(id)
  const { director } = useMovieCredits(id)
  const { backdrops, posters } = useMovieImages(id)

  if (loading) return <p className="text-text-secondary px-4 pt-4">Loading...</p>
  if (error || !movie) return <p className="text-warn px-4 pt-4">Failed to load movie</p>

  const isReleased = new Date(movie.release_date) <= new Date()

  // Use backdrops if available, fall back to posters, fall back to the movie's own poster
  const images = backdrops.length > 0
    ? backdrops.slice(0, 8).map(b => b.file_path)
    : posters.length > 0
      ? posters.slice(0, 8).map(p => p.file_path)
      : [movie.poster_path]

  return (
    <div className="pb-24">
      <Header back title="Details Movie" bookmark />

      <Slider>
        {images.map((path, i) => (
          <div key={i} className="min-w-64 snap-start">
            <img
              src={`${IMAGE_BASE_URL}${path}`}
              alt={movie.title}
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        ))}
      </Slider>

      <MovieDetails
        title={movie.title}
        director={director ?? 'Unknown'}
        rating={movie.vote_average}
        genres={movie.genres.map(g => g.name)}
        overview={movie.overview}
        posterPath={movie.poster_path}
        runtime={movie.runtime}
      />

      {isReleased && (
        <div className="fixed bottom-0 left-0 right-0 p-4 w-full">
          <Button title='Book Ticket' link={`/book/${id}`} />
        </div>
      )}
    </div>
  )
}
