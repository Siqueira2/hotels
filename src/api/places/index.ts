import type { Place } from 'src/interfaces'
import places from 'src/data/place.json'

export const fetchPlaces = async () => {
  return await new Promise<Place[]>((resolve) => setTimeout(() => resolve(places), 2000))
}
