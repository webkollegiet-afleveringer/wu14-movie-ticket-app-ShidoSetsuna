import { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import type { MovieDetails } from '../api/types'
import { useSavedStore } from '../store/savedStore'
import Button from './button'

const CINEMAS = ['Empire XXI Yogyakarta', 'Viva Cinema', 'CGV Grand Indonesia', 'Cinepolis Lippo Mall']
const TIMES = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '09:30 PM']

interface FormMoviePlanProps {
  movie: MovieDetails
}

const FormMoviePlan: React.FC<FormMoviePlanProps> = ({ movie }) => {
  const [cinema, setCinema] = useState(CINEMAS[0])
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [time, setTime] = useState(TIMES[1])
  const [persons, setPersons] = useState(1)
  const { toggleSaved } = useSavedStore()

  const selectClass = 'w-full bg-bg rounded-xl px-4 py-3 border border-stroke text-text text-sm appearance-none max-h-11'

  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3">

      <fieldset>
        <label htmlFor={`cinema-${movie.id}`} className="text-text-secondary text-sm mb-1 block">Cinema</label>
        <select
          id={`cinema-${movie.id}`}
          value={cinema}
          onChange={e => setCinema(e.target.value)}
          className={selectClass}
        >
          {CINEMAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </fieldset>

      <div className="flex gap-3">
        <fieldset className="flex-1">
          <label htmlFor={`date-${movie.id}`} className="text-text-secondary text-sm mb-1 block">Date</label>
          <input
            id={`date-${movie.id}`}
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={selectClass}
          />
        </fieldset>
        <fieldset className="flex-1">
          <label htmlFor={`time-${movie.id}`} className="text-text-secondary text-sm mb-1 block">Time</label>
          <select
            id={`time-${movie.id}`}
            value={time}
            onChange={e => setTime(e.target.value)}
            className={selectClass}
          >
            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </fieldset>
      </div>

      <fieldset>
        <label className="text-text-secondary text-sm mb-1 block">Person</label>
        <div className="flex items-center justify-between w-full bg-bg rounded-xl px-4 py-3 border border-stroke max-h-11">
          <button
            type="button"
            onClick={() => setPersons(p => Math.max(1, p - 1))}
            aria-label="Decrease persons"
            className="w-6 h-6 rounded-full border border-stroke flex items-center justify-center"
          >
            <Minus size={14} className="text-text" />
          </button>
          <output className="text-text font-semibold w-4 text-center">{persons}</output>
          <button
            type="button"
            onClick={() => setPersons(p => p + 1)}
            aria-label="Increase persons"
            className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
          >
            <Plus size={14} className="text-white" />
          </button>
        </div>
      </fieldset>

      <div className="flex gap-4 mt-1">
        <Button
          title="Checkout"
          to={`/select-seats?movieId=${movie.id}&cinema=${encodeURIComponent(cinema)}&date=${date}&time=${encodeURIComponent(time)}&persons=${persons}`}
          className="flex-1"
        />
        <Button
          title=""
          icon={<Trash2 size={18} />}
          variant="danger"
          onClick={() => toggleSaved(movie)}
          className="w-16 px-0"
        />
      </div>

    </div>
  )
}

export default FormMoviePlan 