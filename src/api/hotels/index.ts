import type { PlaceHotels, FetchHotelsParams } from 'src/interfaces'
import { PlaceHotelModel } from 'src/models/placeHotel'

import placeHotels from 'src/data/hotel.json'

const filterHotels = (
  places: PlaceHotels[],
  { page = 1, limit = 10, name = '', sortBy = 'recommended' }: FetchHotelsParams,
): PlaceHotels[] => {
  const allHotels = places.flatMap((place) =>
    place.hotels
      .filter((hotel) => {
        if (!name) return true
        const [city = '', state = ''] = name.split(',')
        const nameMatch = hotel.address.city.toLowerCase().includes(city.toLowerCase())
        const stateMatch = hotel.address.state.toLowerCase().includes(state.toLowerCase())
        return nameMatch || stateMatch
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return Number(b.stars) - Number(a.stars)
        }
        return 0
      })
      .map((hotel) => ({
        placeId: place.placeId,
        hotels: [hotel],
      })),
  )

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const filteredHotels = allHotels
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

  return filteredHotels
}

export const fetchPlaceHotels = async (pagination: FetchHotelsParams) => {
  return await new Promise<PlaceHotelModel[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          filterHotels(placeHotels as PlaceHotels[], pagination).map(
            (placeHotel) => new PlaceHotelModel(placeHotel),
          ),
        ),
      1000,
    ),
  )
}
