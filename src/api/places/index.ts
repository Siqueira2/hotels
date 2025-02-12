import { Place } from 'src/models/place'
import places from 'src/data/place.json'

export const fetchPlaces = async () => {
  return await new Promise<Place[]>((resolve) =>
    setTimeout(() => resolve(places.map((place) => new Place(place))), 2000),
  )
}
