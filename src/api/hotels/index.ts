import type { PlaceHotels } from 'src/interfaces'
import { PlaceHotelModel } from 'src/models/placeHotel'
import placeHotels from 'src/data/hotel.json'

export const fetchPlaceHotels = async () => {
  return await new Promise<PlaceHotelModel[]>((resolve) =>
    setTimeout(
      () =>
        resolve(placeHotels.map((placeHotel) => new PlaceHotelModel(placeHotel as PlaceHotels))),
      2000,
    ),
  )
}
