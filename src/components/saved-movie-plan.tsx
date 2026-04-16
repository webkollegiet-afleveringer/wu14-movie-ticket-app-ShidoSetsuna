import { useState } from 'react'
import { Star, ChevronDown } from 'lucide-react'
import { IMAGE_BASE_URL } from '../api/tmdb'
import type { MovieDetails } from '../api/types'
import FormMoviePlan from './form-movie-plan'

interface SavedMoviePlanProps {
  movie: MovieDetails
  index: number
}

const SavedMoviePlan: React.FC<SavedMoviePlanProps> = ({ movie, index }) => {
  const [expanded, setExpanded] = useState(false)

  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60

  return (
    <article className="mb-6">

      <h2 className="text-text font-bold text-lg mb-3">
        {index}. {new Date(movie.release_date).toLocaleDateString('en-US', {
          day: '2-digit', month: 'long', year: 'numeric'
        })}
      </h2>

      <button
        className="flex items-center gap-3 w-full text-left mb-3"
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
      >
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-16 h-16 rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-accent text-sm">{movie.genres[0]?.name ?? 'Movie'}</p>
          <h3 className="text-text font-semibold truncate">{movie.title}</h3>
          <p className="text-text-secondary text-sm">{hours}h {minutes}m</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Star size={14} className="text-accent fill-accent" />
          <span className="text-text text-sm font-semibold">
            {(movie.vote_average / 2).toFixed(1)}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-text-secondary transition-transform shrink-0 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && <FormMoviePlan movie={movie} />}

    </article>
  )
}

export default SavedMoviePlan
