import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'
import SavedMoviePlan from '../../components/saved-movie-plan'
import { useSavedStore } from '../../store/savedStore'

export const Route = createFileRoute('/_layout/saved')({
  component: RouteComponent,
})

function RouteComponent() {
  const { savedMovies } = useSavedStore()

  return (
    <div>
      <Header back title="Saved Plan" />
      <div className="px-4 pt-4">
        {savedMovies.length === 0 ? (
          <p className="text-text-secondary text-center mt-16">
            No saved movies yet. Tap the bookmark icon on a movie to save it.
          </p>
        ) : (
          savedMovies.map((movie, i) => (
            <SavedMoviePlan key={movie.id} movie={movie} index={i + 1} />
          ))
        )}
      </div>
    </div>
  )
}
