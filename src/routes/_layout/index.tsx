import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'
import SearchTool from '../../components/search'
import Slider from '../../components/slider'
import MovieCard from '../../components/movie-card'
import { useUpcoming } from '../../hooks/useMovies'
import { formatReleaseDate } from '../../utils/date'

export const Route = createFileRoute('/_layout/')({
  component: Index,
})

function Index() {
  const { movies, loading, error } = useUpcoming()

  return (
    <div>
      <Header welcome="John Doe" profile />
      <SearchTool defaultOpen />

      {loading && <p className="text-text-secondary px-4">Loading...</p>}
      {error && <p className="text-warn px-4">{error}</p>}

      {!loading && !error && (
        <Slider title="Coming Soon">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              variant="horizontal"
              title={movie.title}
              date={formatReleaseDate(movie.release_date)}
              posterPath={movie.poster_path}
            />
          ))}
        </Slider>
      )}
    </div>
  )
}