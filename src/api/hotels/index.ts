import type { PlaceHotels, FetchHotelsParams } from 'src/interfaces'
import { PlaceHotelModel, HotelFilterService } from 'src/models'
import placeHotels from 'src/data/hotel.json'

export const fetchPlaceHotels = async (pagination: FetchHotelsParams) => {
  const filterService = new HotelFilterService()

  return await new Promise<PlaceHotelModel[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          filterService
            .filterHotels(placeHotels as PlaceHotels[], pagination)
            .map((placeHotel) => new PlaceHotelModel(placeHotel)),
        ),
      1000,
    ),
  )
}
