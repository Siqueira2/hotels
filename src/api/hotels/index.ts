import type { Hotel } from 'src/interfaces'
import hotels from 'src/data/hotel.json'

type HotelsResponse = Array<{ hotels: Hotel[]; placeId: number }>

export const fetchHotels = async () => {
  return await new Promise<HotelsResponse>((resolve) =>
    setTimeout(() => resolve(hotels as HotelsResponse), 2000),
  )
}
