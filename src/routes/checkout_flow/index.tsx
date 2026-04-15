import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import ConfirmationPopup from '../../components/confirmation-popup'
import PaymentCard from '../../components/payment-card'
import FormPayment from '../../components/form-payment'

export const Route = createFileRoute('/checkout_flow/')({
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
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)

  const seatList = seats ? seats.split(',') : []
  const pricePerSeat = 12.475
  const total = (seatList.length * pricePerSeat).toFixed(1)

  return (
    <div className="pb-24">
      <header className="relative flex items-center justify-between p-4 h-16">
        <button onClick={() => history.back()}>
          <ArrowLeft size={22} className="text-text" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-text font-bold">Checkout</h1>
      </header>

      <div className="px-4">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-text font-bold text-base">Payment Method</h2>
          <button className="text-text-secondary text-sm">Change</button>
        </div>

        <PaymentCard />

        <h2 className="text-text font-bold text-base mb-4">Payment Details</h2>

        <FormPayment />

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg">
        <button
          onClick={() => setShowSuccess(true)}
          className="w-full bg-accent text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3"
        >
          <span>Pay Now</span>
          <span className="w-px h-5 bg-white/30" />
          <span>${total}</span>
        </button>
      </div>

      {showSuccess && (
        <ConfirmationPopup
          type="payment"
          onAction={() => navigate({
            to: '/checkout_flow/e-ticket',
            search: { movieId, seats, cinema, date, time },
          })}
        />
      )}
    </div>
  )
}
