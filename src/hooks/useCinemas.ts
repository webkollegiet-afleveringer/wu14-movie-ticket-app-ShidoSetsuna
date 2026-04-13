import { useEffect, useState } from 'react'
import { getUserLocation, getNearbyCinemas } from '../api/cinemas'
import type { Cinema } from '../api/cinemas'

export const useCinemas = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([])
  const [isDefault, setIsDefault] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getUserLocation()
      .then(({ lat, lon, isDefault }) => {
        setIsDefault(isDefault)
        return getNearbyCinemas(lat, lon)
      })
      .then(setCinemas)
      .catch(() => setError('Failed to load cinemas'))
      .finally(() => setLoading(false))
  }, [])

  return { cinemas, isDefault, loading, error }
}
