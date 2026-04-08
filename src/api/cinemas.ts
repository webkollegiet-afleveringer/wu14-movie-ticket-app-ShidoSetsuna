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
  isDefault: boolean // true if geolocation failed and we fell back to default
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
  const query = `
    [out:json][timeout:25];
    node["amenity"="cinema"](around:${radiusMeters},${lat},${lon});
    out body;
  `

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
  })

  const data = await response.json()

  return data.elements.map((el: any) => ({
    id: el.id,
    name: el.tags?.name ?? 'Unknown Cinema',
    lat: el.lat,
    lon: el.lon,
    distance: getDistanceKm(lat, lon, el.lat, el.lon),
    address: el.tags?.['addr:street']
      ? `${el.tags['addr:street']} ${el.tags['addr:housenumber'] ?? ''}`.trim()
      : undefined,
  })).sort((a: Cinema, b: Cinema) => a.distance - b.distance)
}
