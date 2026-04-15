interface TicketProps {
  filmName: string
  date: string
  seats: string
  location: string
  time: string
  orderId: string
}

const Ticket: React.FC<TicketProps> = ({ filmName, date, seats, location, time, orderId }) => {

  return (
    <div className="rounded-2xl bg-white text-bg overflow-hidden">

      <div className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-sm">Film: {filmName}</h3>
          <span className="text-accent font-semibold text-sm">e-ticket</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Date</p>
            <p className="font-semibold">{date}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Seats</p>
            <p className="font-semibold">{seats}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Location</p>
            <p className="font-semibold">{location}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Time</p>
            <p className="font-semibold">{time}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Payment</p>
            <p className="font-semibold">Successful</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Order</p>
            <p className="font-semibold">{orderId}</p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 relative">
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-bg" />
        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-bg" />
      </div>

      <div className="p-6 flex justify-center">
        <div className="flex gap-0.5">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="bg-bg"
              style={{
                width: i % 3 === 0 ? '3px' : '2px',
                height: i % 2 === 0 ? '48px' : '36px',
              }}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Ticket