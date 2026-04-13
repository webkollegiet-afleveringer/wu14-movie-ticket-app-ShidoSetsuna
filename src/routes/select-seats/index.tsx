import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import SeatPicker from '../../components/seat-picker'

export const Route = createFileRoute('/select-seats/')({
  validateSearch: (search: Record<string, unknown>) => ({
    movieId: Number(search.movieId),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { movieId } = Route.useSearch()
  const navigate = useNavigate()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const toggleSeat = (seat: string) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    )
  }

  const handleConfirm = () => {
    navigate({
      to: '/_layout/saved',
      search: { seats: selectedSeats.join(','), movieId },
    })
  }

  return (
    <div className="pb-24">
      <header className="relative flex items-center justify-between p-4 h-16">
        <button onClick={() => history.back()}>
          <ArrowLeft size={22} className="text-text" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-text font-bold">Select Seats</h1>
      </header>

      <div className="px-4 pt-2">
        <SeatPicker selectedSeats={selectedSeats} onToggleSeat={toggleSeat} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg">
        <button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className="w-full bg-accent text-white rounded-2xl py-4 font-semibold disabled:opacity-40"
        >
          {selectedSeats.length > 0
            ? `Confirm Seats (${selectedSeats.join(', ')})`
            : 'Select at least one seat'}
        </button>
      </div>
    </div>
  )
}
