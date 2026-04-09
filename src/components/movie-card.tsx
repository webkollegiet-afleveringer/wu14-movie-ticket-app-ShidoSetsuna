import { IMAGE_BASE_URL } from '../api/tmdb';
import { Star } from 'lucide-react';

type MovieCardVariant = 'horizontal' | 'vertical' | 'poster'

interface MovieCardProps {
  variant: MovieCardVariant
  title?: string
  date?: string
  rating?: number
  posterPath?: string
  genre?: string
}

const HorizontalCard: React.FC<MovieCardProps> = ({ title, date, posterPath }) => (
  <div className="min-w-70 snap-start">
    <img
      src={posterPath ? `${IMAGE_BASE_URL}${posterPath}` : '/placeholder.jpg'}
      alt={title}
      className="w-full h-40 object-cover rounded-2xl"
    />
    <h3 className="mt-2 font-bold text-text line-clamp-2">{title}</h3>
    <p className="text-text-secondary text-sm">{date}</p>
  </div>
)

const VerticalCard: React.FC<MovieCardProps> = ({ title, rating, posterPath }) => (
  <div className="min-w-40 snap-start">
    <img
      src={posterPath ? `${IMAGE_BASE_URL}${posterPath}` : '/placeholder.jpg'}
      alt={title}
      className="w-full h-56 object-cover rounded-2xl"
    />
    <div className="h-16 flex flex-col mt-2">
      <h3 className="font-bold text-text line-clamp-2 mb-auto">{title}</h3>
      {rating !== undefined && (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(rating / 2) ? 'text-accent fill-accent' : 'text-text-secondary'}
            />
          ))}
        </div>
      )}
    </div>
  </div>
)

const PosterCard: React.FC<MovieCardProps> = ({ title, posterPath, genre }) => (
  <div className="min-w-30 snap-start">
    <img
      src={posterPath ? `${IMAGE_BASE_URL}${posterPath}` : '/placeholder.jpg'}
      alt={title}
      className="w-full h-44 object-cover rounded-2xl"
    />
    <div className="h-16 flex flex-col mt-2">
      <h3 className="font-bold text-text line-clamp-2 mb-auto">{title}</h3>
      {genre && <p className="text-text-secondary text-sm">{genre}</p>}
    </div>
  </div>
)

const MovieCard: React.FC<MovieCardProps> = (props) => {
  switch (props.variant) {
    case 'horizontal': return <HorizontalCard {...props} />
    case 'vertical':   return <VerticalCard {...props} />
    case 'poster':     return <PosterCard {...props} />
  }
}

export default MovieCard
