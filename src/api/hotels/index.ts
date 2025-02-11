import type { PlaceHotels } from 'src/interfaces'
import { PlaceHotelModel } from 'src/models/placeHotel'
import placeHotels from 'src/data/hotel.json'

interface PaginationParams {
  page?: number
  limit?: number
}

const filterHotels = (
  places: PlaceHotels[],
  { page = 1, limit = 10 }: PaginationParams,
): PlaceHotels[] => {
  const allHotels = places.flatMap((place) =>
    place.hotels.map((hotel) => ({
      placeId: place.placeId,
      hotels: [hotel],
    })),
  )

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return allHotels
    .slice(startIndex, endIndex)
    .reduce<PlaceHotels[]>((aggregatedPlaces, currentPlace) => {
      const existingPlace = aggregatedPlaces.find((place) => place.placeId === currentPlace.placeId)

      if (existingPlace) {
        existingPlace.hotels.push(...currentPlace.hotels)
      } else {
        aggregatedPlaces.push(currentPlace)
      }

      return aggregatedPlaces
    }, [])
}

export const fetchPlaceHotels = async (pagination: PaginationParams) => {
  return await new Promise<PlaceHotelModel[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          filterHotels(placeHotels as PlaceHotels[], pagination).map(
            (placeHotel) => new PlaceHotelModel(placeHotel),
          ),
        ),
      2000,
    ),
  )
}
