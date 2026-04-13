import { useState } from 'react'
import { Star, ChevronDown, Minus, Plus, Trash2 } from 'lucide-react'
import { IMAGE_BASE_URL } from '../api/tmdb'
import type { MovieDetails } from '../api/types'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useSavedStore } from '../store/savedStore'
import Button from './button'

interface SavedMoviePlanProps {
  movie: MovieDetails
  index: number
}

const SavedMoviePlan: React.FC<SavedMoviePlanProps> = ({ movie, index }) => {
  const [expanded, setExpanded] = useState(false)
  const [persons, setPersons] = useState(1)
  const { toggleSaved } = useSavedStore()
  const navigate = useNavigate()

  const search = useSearch({ strict: false }) as { seats?: string; movieId?: number }
  const confirmedSeats = search.movieId === movie.id && search.seats
    ? search.seats.split(',').filter(Boolean)
    : []

  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60

  return (
    <div className="mb-6">

      <h2 className="text-text font-bold text-lg mb-3">
        {index}. {new Date(movie.release_date).toLocaleDateString('en-US', {
          day: '2-digit', month: 'long', year: 'numeric'
        })}
      </h2>

      <button
        className="flex items-center gap-3 w-full text-left mb-3"
        onClick={() => setExpanded(prev => !prev)}
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

      {expanded && (
        <div className="rounded-2xl p-4 flex flex-col gap-3">

          <div>
            <label className="text-text-secondary text-sm mb-1 block">Cinema</label>
            <div className="flex items-center justify-between bg-bg rounded-xl px-4 py-3 border border-stroke max-h-11">
              <span className="text-text text-sm">Select Cinema</span>
              <ChevronDown size={16} className="text-text-secondary" />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-text-secondary text-sm mb-1 block">Date</label>
              <div className="flex items-center justify-between bg-bg rounded-xl px-4 py-3 border border-stroke max-h-11">
                <span className="text-text text-sm">
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </span>
                <ChevronDown size={16} className="text-text-secondary" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-text-secondary text-sm mb-1 block">Time</label>
              <div className="flex items-center justify-between bg-bg rounded-xl px-4 py-3 border border-stroke max-h-11">
                <span className="text-text text-sm">01:00 PM</span>
                <ChevronDown size={16} className="text-text-secondary" />
              </div>
            </div>
          </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-text-secondary text-sm mb-1 block">Seats</label>
            <button
              onClick={() => navigate({ to: '/select-seats', search: { movieId: movie.id } })}
              className="flex items-center justify-between w-full bg-bg rounded-xl px-4 py-3 border border-stroke max-h-11"
            >
              <span className="text-text text-sm">
                {confirmedSeats.length > 0 ? confirmedSeats.join(', ') : 'Select Seats'}
              </span>
              <ChevronDown size={16} className="text-text-secondary" />
            </button>
          </div>

          <div className="flex-1">
            <label className="text-text-secondary text-sm mb-1 block">Person</label>
            <div className="flex items-center justify-between w-full bg-bg rounded-xl px-4 py-3 border border-stroke max-h-11">
              <button
                onClick={() => setPersons(p => Math.max(1, p - 1))}
                className="w-6 h-6 rounded-full border border-stroke flex items-center justify-center"
              >
                <Minus size={14} className="text-text" />
              </button>
              <span className="text-text font-semibold w-4 text-center">{persons}</span>
              <button
                onClick={() => setPersons(p => p + 1)}
                className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
              >
                <Plus size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>

          <div className="flex gap-4 mt-1">
            <Button
              title="Checkout"
              to="/checkout_flow"
              className="flex-1"
            />
            <Button
              title=""
              icon={<Trash2 size={18} />}
              variant="danger"
              onClick={() => toggleSaved(movie)}
              className="w-16 px-0"
            />
          </div>

        </div>
      )}

    </div>
  )
}

export default SavedMoviePlan
