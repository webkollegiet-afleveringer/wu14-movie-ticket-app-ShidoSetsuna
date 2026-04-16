import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'
import Slider from '../../components/slider'
import MovieCard from '../../components/movie-card'
import TabSwitcher from '../../components/tab-switcher'
import { useNowPlaying, useUpcoming, usePopular, useReleasingSoon, useGenres } from '../../hooks/useMovies'

export const Route = createFileRoute('/_layout/explore')({
  component: Explore,
})

const TABS = [
  { label: 'Now Showing', value: 'now_showing' },
  { label: 'Upcoming', value: 'upcoming' },
]

function Explore() {
  const [activeTab, setActiveTab] = useState('now_showing')

  const { movies: nowPlaying, loading: l1, error: e1 } = useNowPlaying()
  const { movies: upcoming, loading: l2, error: e2 } = useUpcoming()
  const { movies: popular, loading: l3, error: e3 } = usePopular()
  const { movies: releasingSoon, loading: l4, error: e4 } = useReleasingSoon()
  const { getGenreName } = useGenres()

  const isNowShowing = activeTab === 'now_showing'
  const topMovies = isNowShowing ? nowPlaying : upcoming
  const secondSlider = isNowShowing ? popular : releasingSoon
  const secondTitle = isNowShowing ? 'Recommended' : 'Releasing Soon'
  const loading = isNowShowing ? (l1 || l3) : (l2 || l4)
  const error = isNowShowing ? (e1 || e3) : (e2 || e4)

  return (
    <div>
      <Header back title="Explore Movies" search />
      <TabSwitcher tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {loading && <p className="text-text-secondary px-4">Loading...</p>}
      {error && <p className="text-warn px-4">Failed to load movies</p>}

      {!loading && !error && (
        <>
          <Slider title="Top Movies" seeMore>
            {topMovies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                variant="vertical"
                title={movie.title}
                rating={movie.vote_average}
                posterPath={movie.poster_path}
              />
            ))}
          </Slider>

          <Slider title={secondTitle} seeMore>
            {secondSlider.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                variant="poster"
                title={movie.title}
                posterPath={movie.poster_path}
                genre={isNowShowing ? getGenreName(movie.genre_ids[0]) : formatReleaseDate(movie.release_date)}
              />
            ))}
          </Slider>
        </>
      )}
    </div>
  )
}

const formatReleaseDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
