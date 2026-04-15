import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import Slider from '../../components/slider'
import Ticket from '../../components/ticket'
import ConfirmationPopup from '../../components/confirmation-popup'
import { useMovieDetails } from '../../hooks/useMovies'

export const Route = createFileRoute('/checkout_flow/e-ticket')({
  validateSearch: (search: Record<string, unknown>) => ({
    movieId: Number(search.movieId ?? 0),
    seats: (search.seats as string) ?? '',
    cinema: (search.cinema as string) ?? 'Viva Cinema',
    date: (search.date as string) ?? '',
    time: (search.time as string) ?? '01:00 PM',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { movieId, seats, cinema, date, time } = Route.useSearch()
  const { movie } = useMovieDetails(movieId)
  const navigate = useNavigate()
  const [showDownloaded, setShowDownloaded] = useState(false)

  const seatList = seats ? seats.split(',') : []

  return (
    <div className="pb-24">
      <header className="relative flex items-center justify-between p-4 h-16">
        <button onClick={() => history.back()}>
          <ArrowLeft size={22} className="text-text" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-text font-bold">E-Ticket</h1>
      </header>

      <div className="px-4 mb-6">
        <h2 className="text-text font-bold text-base mb-2">Instruction</h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          Come to the cinema, show and scan the barcode to the space provided.
          Continue to comply with health protocols.
        </p>
      </div>

      <Slider centered>
        <div className="w-[8%] shrink-0" />
        {seatList.map((seat, i) => (
          <div key={seat} className="w-[84%] shrink-0 snap-center px-2">
            <Ticket
              filmName={movie?.title ?? 'Movie'}
              date={date}
              seats={seat}
              location={cinema}
              time={time}
              orderId={`190456${i + 1}`}
            />
          </div>
        ))}
        <div className="w-[8%] shrink-0" />
      </Slider>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg">
        <button
          onClick={() => setShowDownloaded(true)}
          className="w-full bg-accent text-white rounded-2xl py-4 font-semibold"
        >
          Download E-Ticket
        </button>
      </div>

      {showDownloaded && (
        <ConfirmationPopup
          type="download"
          onAction={() => navigate({ to: '/' })}
        />
      )}
    </div>
  )
}
