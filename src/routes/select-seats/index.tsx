import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Header from '../../components/header'
import SeatPicker from '../../components/seat-picker'

const CINEMAS = ['Empire XXI Yogyakarta', 'Viva Cinema', 'CGV Grand Indonesia', 'Cinepolis Lippo Mall']
const TIMES = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '09:30 PM']

export const Route = createFileRoute('/select-seats/')({
  validateSearch: (search: Record<string, unknown>) => ({
    movieId: Number(search.movieId),
    cinema: (search.cinema as string) || undefined,
    date: (search.date as string) || undefined,
    time: (search.time as string) || undefined,
    persons: search.persons ? Number(search.persons) : undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { movieId, persons: requiredSeats, ...prefilled } = Route.useSearch()
  const navigate = useNavigate()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [cinema, setCinema] = useState(prefilled.cinema ?? CINEMAS[0])
  const [date, setDate] = useState(prefilled.date ?? new Date().toISOString().split('T')[0])
  const [time, setTime] = useState(prefilled.time ?? TIMES[1])

  const toggleSeat = (seat: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seat)) return prev.filter(s => s !== seat)
      if (requiredSeats && prev.length >= requiredSeats) return prev
      return [...prev, seat]
    })
  }

  const canCheckout = requiredSeats
    ? selectedSeats.length === requiredSeats
    : selectedSeats.length > 0

  const selectClass = 'w-full bg-bg rounded-xl px-4 py-3 border border-stroke text-text text-sm appearance-none'

  return (
    <div className="pb-24">
      <Header back title="Select Seats" />

      <div className="px-4 flex flex-col gap-3 mb-4">
        <div>
          <label className="text-text-secondary text-sm mb-1 block">Cinema</label>
          <select value={cinema} onChange={e => setCinema(e.target.value)} className={selectClass}>
            {CINEMAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-text-secondary text-sm mb-1 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className={selectClass}
            />
          </div>
          <div className="flex-1">
            <label className="text-text-secondary text-sm mb-1 block">Time</label>
            <select value={time} onChange={e => setTime(e.target.value)} className={selectClass}>
              {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {requiredSeats && (
        <p className="text-text-secondary text-sm px-4 mb-2">
          Select exactly {requiredSeats} seat{requiredSeats > 1 ? 's' : ''} ({selectedSeats.length}/{requiredSeats})
        </p>
      )}

      <div className="px-4 pt-2">
        <SeatPicker selectedSeats={selectedSeats} onToggleSeat={toggleSeat} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg">
        <button
          onClick={() => navigate({
            to: '/checkout_flow',
            search: { movieId, seats: selectedSeats.join(','), cinema, date, time },
          })}
          disabled={!canCheckout}
          className="w-full bg-accent text-white rounded-2xl py-4 font-semibold disabled:opacity-40"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}