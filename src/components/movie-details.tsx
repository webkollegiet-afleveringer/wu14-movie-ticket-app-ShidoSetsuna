import { useState } from 'react'
import { Star } from 'lucide-react'
import MovieTags from './movie-tags'

interface MovieDetailsProps {
  title: string
  director: string
  rating: number
  genres: string[]
  overview: string
  posterPath: string
  runtime: number
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  title,
  director,
  rating,
  genres,
  overview,
  runtime,
}) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = overview.length > 150

  return (
    <div className="px-4 pt-4">

      {/* Title + director + rating */}
      <h1 className="text-text font-bold text-2xl">{title}</h1>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-text-secondary text-sm">Director: {director}</span>
        <span className="text-text-secondary">|</span>
        <Star size={14} className="text-accent fill-accent" />
        <span className="text-text text-sm font-semibold">{(rating / 2).toFixed(1)}</span>
      </div>

      <MovieTags genres={genres} runtime={runtime} />

      {/* Synopsis */}
      <div className="mt-4">
        <h2 className="text-text font-bold text-lg mb-2">Synopsis</h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          {expanded || !isLong ? overview : `${overview.slice(0, 150)}...`}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="text-accent text-sm mt-1"
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

    </div>
  )
}

export default MovieDetails
