import type { HotelsResponse } from 'src/interfaces'
import hotels from 'src/data/hotel.json'

export const fetchHotels = async () => {
  return await new Promise<HotelsResponse>((resolve) =>
    setTimeout(() => resolve(hotels as HotelsResponse), 2000),
  )
}
