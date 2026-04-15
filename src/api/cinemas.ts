export interface Cinema {
  id: number
  name: string
  distance: number
  address: string
  rating: number
  closingTime: string
  logo: string
}

export const CINEMAS: Cinema[] = [
  {
    id: 1,
    name: 'Empire XXI Yogyakarta',
    distance: 1.2,
    address: 'Jl. Magelang KM 6',
    rating: 4.5,
    closingTime: '11:00 PM',
    logo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Viva Cinema',
    distance: 2.8,
    address: 'Hartono Mall, Jl. Ring Road',
    rating: 4.2,
    closingTime: '10:30 PM',
    logo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'CGV Grand Indonesia',
    distance: 3.5,
    address: 'Grand Indonesia Mall, 8th Floor',
    rating: 4.7,
    closingTime: '11:30 PM',
    logo: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Cinepolis Lippo Mall',
    distance: 5.1,
    address: 'Lippo Mall Kuta, 3rd Floor',
    rating: 4.0,
    closingTime: '10:00 PM',
    logo: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=100&h=100&fit=crop',
  },
  {
    id: 5,
    name: 'Plaza Cinema',
    distance: 6.3,
    address: 'Ambarukmo Plaza, 5th Floor',
    rating: 3.8,
    closingTime: '10:00 PM',
    logo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&h=100&fit=crop',
  },
]
