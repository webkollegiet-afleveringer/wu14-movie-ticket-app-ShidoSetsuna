import MovieMiniView from './movie-mini-view'
import type { Cinema } from '../api/cinemas'

interface ListViewProps {
  cinemas: Cinema[]
  isDefault?: boolean
}

const ListView: React.FC<ListViewProps> = ({ cinemas, isDefault }) => {
  return (
    <div className="px-4 mt-4">

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-text font-bold text-lg">Cinema Near You</h2>
        <button className="text-text-secondary text-sm">See all</button>
      </div>

      {isDefault && (
        <p className="text-text-secondary text-xs mb-2">
          Showing cinemas near Copenhagen — enable location for results near you.
        </p>
      )}

      <div className="divide-y divide-muted">
        {cinemas.map(cinema => (
          <MovieMiniView
            key={cinema.id}
            name={cinema.name}
            distance={cinema.distance}
          />
        ))}
      </div>

    </div>
  )
}

export default ListView