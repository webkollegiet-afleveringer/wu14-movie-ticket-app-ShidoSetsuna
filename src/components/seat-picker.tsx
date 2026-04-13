interface SeatPickerProps {
  selectedSeats: string[]
  onToggleSeat: (seat: string) => void
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F']
const COLS = 8

// Mock some reserved seats
const RESERVED = ['B3', 'B4', 'C1', 'C2', 'C3', 'C5', 'C6', 'C7', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8']

const SeatPicker: React.FC<SeatPickerProps> = ({ selectedSeats, onToggleSeat }) => {
  return (
    <div>
      {/* Screen curve */}
      <div className="flex justify-center mb-6">
        <div className="w-64 h-4 rounded-b-full bg-accent shadow-xl shadow-accent" />
      </div>


    <div className="flex flex-col items-center">
        {ROWS.map((row, rowIndex) => {
          const isEdgeRow = rowIndex === 0 || rowIndex === ROWS.length - 1
          const half = COLS / 2

          const renderSeat = (i: number) => {
            const seat = `${row}${i + 1}`
            const isReserved = RESERVED.includes(seat)
            const isSelected = selectedSeats.includes(seat)

            if (isEdgeRow && (i < 2 || i >= COLS - 2)) {
              return <div key={seat} className="w-8 h-8" />
            }

            return (
              <button
                key={seat}
                disabled={isReserved}
                onClick={() => onToggleSeat(seat)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  isReserved
                    ? 'bg-warn cursor-not-allowed opacity-80'
                    : isSelected
                      ? 'bg-accent text-white'
                      : 'border border-stroke text-text-secondary'
                }`}
              />
            )
          }

          return (
            <div key={row} className="flex m-2 gap-2 items-center">
              {Array.from({ length: half }, (_, i) => renderSeat(i))}
              <div className="w-6" /> {/* aisle */}
              {Array.from({ length: half }, (_, i) => renderSeat(i + half))}
            </div>
          )
        })}

    </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent" />
          <span className="text-text-secondary text-xs">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warn" />
          <span className="text-text-secondary text-xs">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-stroke" />
          <span className="text-text-secondary text-xs">Available</span>
        </div>
      </div>
    </div>
  )
}

export default SeatPicker