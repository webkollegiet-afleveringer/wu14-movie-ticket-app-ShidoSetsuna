import { MapPin, Star } from 'lucide-react'

interface MovieMiniViewProps {
  name: string
  distance: number
  rating?: number
  closingTime?: string
  logo?: string
}

const MovieMiniView: React.FC<MovieMiniViewProps> = ({ name, distance, rating, closingTime, logo }) => {
  return (
    <article className="flex items-center gap-3 py-3">

      <div className="w-14 h-14 rounded-xl bg-muted shrink-0 overflow-hidden">
        {logo
          ? <img src={logo} alt={name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-muted" />
        }
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-0.5">
          <MapPin size={12} className="text-accent shrink-0" />
          <span className="text-accent text-xs">{distance} Kilometers</span>
        </div>
        <h3 className="text-text font-semibold truncate">{name}</h3>
        {closingTime && (
          <p className="text-text-secondary text-sm">Closed {closingTime}</p>
        )}
      </div>

      {rating !== undefined && (
        <div className="flex items-center gap-1 shrink-0">
          <Star size={14} className="text-accent fill-accent" />
          <span className="text-text text-sm font-semibold">{rating.toFixed(1)}</span>
        </div>
      )}

    </article>
  )
}

export default MovieMiniView
