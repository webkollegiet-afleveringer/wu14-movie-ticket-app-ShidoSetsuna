export interface Cinema {
  id: number
  name: string
  lat: number
  lon: number
  distance: number // in kilometers
  address?: string
}

export interface LocationResult {
  lat: number
  lon: number
  isDefault: boolean
}

// Default location: Copenhagen
const DEFAULT_LOCATION = { lat: 55.6761, lon: 12.5683 }

const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

export const getUserLocation = (): Promise<LocationResult> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ ...DEFAULT_LOCATION, isDefault: true })
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        isDefault: false,
      }),
      () => resolve({ ...DEFAULT_LOCATION, isDefault: true })
    )
  })
}

export const getNearbyCinemas = async (lat: number, lon: number, radiusMeters = 5000): Promise<Cinema[]> => {
  const url = `https://nominatim.openstreetmap.org/search?` + new URLSearchParams({
    q: 'cinema',
    format: 'json',
    limit: '10',
    viewbox: [
      lon - 0.1, lat + 0.1,
      lon + 0.1, lat - 0.1,
    ].join(','),
    bounded: '1',
    addressdetails: '1',
  })

  const response = await fetch(url, {
    headers: { 'Accept-Language': 'en' }
  })

  if (!response.ok) throw new Error(`Nominatim error: ${response.status}`)

  const data = await response.json()

  return data
    .map((el: any) => ({
      id: el.place_id,
      name: el.name || el.display_name.split(',')[0],
      lat: parseFloat(el.lat),
      lon: parseFloat(el.lon),
      distance: getDistanceKm(lat, lon, parseFloat(el.lat), parseFloat(el.lon)),
      address: el.address
        ? [el.address.road, el.address.house_number].filter(Boolean).join(' ')
        : undefined,
    }))
    .sort((a: Cinema, b: Cinema) => a.distance - b.distance)
}
