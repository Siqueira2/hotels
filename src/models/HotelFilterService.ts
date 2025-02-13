import type { PlaceHotels, FetchHotelsParams, Hotel } from 'src/interfaces'

export class HotelFilterService {
  private filterByLocation(hotel: Hotel, searchName: string): boolean {
    if (!searchName) return true

    const [city = '', state = ''] = searchName.split(',')
    const cityMatch = hotel.address.city.toLowerCase().includes(city.toLowerCase())
    const stateMatch = hotel.address.state.toLowerCase().includes(state.toLowerCase())
    const hotelNameMatch = hotel.name.toLowerCase().includes(searchName.toLowerCase())

    return cityMatch || stateMatch || hotelNameMatch
  }

  private sortHotels(hotelA: Hotel, hotelB: Hotel, sortBy: string): number {
    if (sortBy === 'rating') {
      return Number(hotelB.stars) - Number(hotelA.stars)
    }
    return 0
  }

  private flattenAndTransformHotels(
    places: PlaceHotels[],
    name: string,
    sortBy: string,
  ): PlaceHotels[] {
    return places.flatMap((place) =>
      place.hotels
        .filter((hotel) => this.filterByLocation(hotel, name))
        .sort((a, b) => this.sortHotels(a, b, sortBy))
        .map((hotel) => ({
          placeId: place.placeId,
          hotels: [hotel],
        })),
    )
  }

  private aggregateHotelsByPlace(hotels: PlaceHotels[]): PlaceHotels[] {
    return hotels.reduce<PlaceHotels[]>((aggregatedPlaces, currentPlace) => {
      const existingPlace = aggregatedPlaces.find((place) => place.placeId === currentPlace.placeId)

      if (existingPlace) {
        existingPlace.hotels.push(...currentPlace.hotels)
      } else {
        aggregatedPlaces.push(currentPlace)
      }

      return aggregatedPlaces
    }, [])
  }

  public filterHotels(
    places: PlaceHotels[],
    { page = 1, limit = 10, name = '', sortBy = 'recommended' }: FetchHotelsParams,
  ): PlaceHotels[] {
    const allHotels = this.flattenAndTransformHotels(places, name, sortBy)

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedHotels = allHotels.slice(startIndex, endIndex)
    return this.aggregateHotelsByPlace(paginatedHotels)
  }
}
