import { Link } from '@tanstack/react-router';
import { IMAGE_BASE_URL } from '../api/tmdb';
import { Star } from 'lucide-react';

type MovieCardVariant = 'horizontal' | 'vertical' | 'poster' | 'image'

interface MovieCardProps {
  variant: MovieCardVariant
  id?: number
  title?: string
  date?: string
  rating?: number
  posterPath?: string
  genre?: string
}

const CardWrapper: React.FC<{ id?: number; className: string; children: React.ReactNode }> = ({ id, className, children }) => {
  if (id) {
    return (
      <Link to="/details" search={{ id }} className={className}>
        {children}
      </Link>
    )
  }
  return <div className={className}>{children}</div>
}

const HorizontalCard: React.FC<MovieCardProps> = ({ id, title, date, posterPath }) => (
  <CardWrapper id={id} className="min-w-70 snap-start">
    <img
      src={posterPath ? `${IMAGE_BASE_URL}${posterPath}` : '/placeholder.jpg'}
      alt={title}
      className="w-full h-40 object-cover rounded-2xl"
    />
    <h3 className="mt-2 font-bold text-text line-clamp-2">{title}</h3>
    <p className="text-text-secondary text-sm">{date}</p>
  </CardWrapper>
)

const VerticalCard: React.FC<MovieCardProps> = ({ id, title, rating, posterPath }) => (
  <CardWrapper id={id} className="min-w-40 snap-start">
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
  </CardWrapper>
)

const PosterCard: React.FC<MovieCardProps> = ({ id, title, posterPath, genre }) => (
  <CardWrapper id={id} className="min-w-30 snap-start">
    <img
      src={posterPath ? `${IMAGE_BASE_URL}${posterPath}` : '/placeholder.jpg'}
      alt={title}
      className="w-full h-44 object-cover rounded-2xl"
    />
    <div className="h-16 flex flex-col mt-2">
      <h3 className="font-bold text-text line-clamp-2 mb-auto">{title}</h3>
      {genre && <p className="text-text-secondary text-sm">{genre}</p>}
    </div>
  </CardWrapper>
)

// Details hero
const ImageCard: React.FC<MovieCardProps> = ({ id, title, posterPath }) => (
  <CardWrapper id={id} className="min-w-64 snap-start">
    <img
      src={posterPath ? `${IMAGE_BASE_URL}${posterPath}` : '/placeholder.jpg'}
      alt={title}
      className="w-full h-80 object-cover rounded-2xl"
    />
  </CardWrapper>
)

const MovieCard: React.FC<MovieCardProps> = (props) => {
  switch (props.variant) {
    case 'horizontal': return <HorizontalCard {...props} />
    case 'vertical':   return <VerticalCard {...props} />
    case 'poster':     return <PosterCard {...props} />
    case 'image':      return <ImageCard {...props} />
  }
}

export default MovieCard
