import MovieMiniView from './movie-mini-view'
import type { Cinema } from '../api/cinemas'

interface ListViewProps {
  cinemas: Cinema[]
}

const ListView: React.FC<ListViewProps> = ({ cinemas }) => {
  return (
    <div className="px-4 mt-4">

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-text font-bold text-lg">Cinema Near You</h2>
        <button className="text-text-secondary text-sm">See all</button>
      </div>

      <div className="divide-y divide-muted">
        {cinemas.map(cinema => (
          <MovieMiniView
            key={cinema.id}
            name={cinema.name}
            distance={cinema.distance}
            rating={cinema.rating}
            closingTime={cinema.closingTime}
            logo={cinema.logo}
          />
        ))}
      </div>

    </div>
  )
}

export default ListView
