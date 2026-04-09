import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'
import Slider from '../../components/slider'
import MovieCard from '../../components/movie-card'
import TabSwitcher from '../../components/tab-switcher'
import { useNowPlaying, usePopular } from '../../hooks/useMovies'

export const Route = createFileRoute('/_layout/explore')({
  component: Explore,
})

function Explore() {
  const { movies: nowPlaying, loading: loadingNowPlaying, error: errorNowPlaying } = useNowPlaying()
  const { movies: popular, loading: loadingPopular, error: errorPopular } = usePopular()

  return (
    <div>
      <Header back title="Explore Movies" search />
      <TabSwitcher />

      {(loadingNowPlaying || loadingPopular) && <p className="text-text-secondary px-4">Loading...</p>}
      {(errorNowPlaying || errorPopular) && <p className="text-warn px-4">Failed to load movies</p>}

      {!loadingNowPlaying && !errorNowPlaying && (
        <Slider title="Top Movies" seeMore>
          {nowPlaying.map(movie => (
            <MovieCard
              key={movie.id}
              variant="vertical"
              title={movie.title}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
            />
          ))}
        </Slider>
      )}

      {!loadingPopular && !errorPopular && (
        <Slider title="Recommended" seeMore>
          {popular.map(movie => (
            <MovieCard
              key={movie.id}
              variant="poster"
              title={movie.title}
              posterPath={movie.poster_path}
            />
          ))}
        </Slider>
      )}
    </div>
  )
}
