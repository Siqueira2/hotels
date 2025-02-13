import type { PlaceHotels, FetchHotelsParams, Hotel } from 'src/interfaces'

export class HotelFilterService {
  private isLocationSearch(searchTerm: string): boolean {
    return searchTerm.includes(',')
  }

  private matchesCityAndState(hotel: Hotel, city: string, state: string): boolean {
    const hotelCity = hotel.address.city.toLowerCase()
    const hotelState = hotel.address.state.toLowerCase()

    return hotelCity.includes(city) && hotelState.includes(state)
  }

  private matchesGeneralSearch(hotel: Hotel, searchTerm: string): boolean {
    const hotelName = hotel.name.toLowerCase()
    const hotelCity = hotel.address.city.toLowerCase()
    const hotelState = hotel.address.state.toLowerCase()

    return (
      hotelName.includes(searchTerm) ||
      hotelCity.includes(searchTerm) ||
      hotelState.includes(searchTerm)
    )
  }

  private filterByLocation(hotel: Hotel, searchName: string): boolean {
    if (!searchName) return true

    const searchTerm = searchName.toLowerCase().trim()

    if (this.isLocationSearch(searchTerm)) {
      const [city = '', state = ''] = searchTerm.split(',').map((term) => term.trim())
      return this.matchesCityAndState(hotel, city, state)
    }

    return this.matchesGeneralSearch(hotel, searchTerm)
  }

  private sortHotels(hotelA: Hotel, hotelB: Hotel, sortBy: string): number {
    switch (sortBy) {
      case 'rating':
        return Number(hotelB.stars) - Number(hotelA.stars)
      case 'recommended':
        return Number(hotelA.price) - Number(hotelB.price)
      default:
        return 0
    }
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
    { page = 1, limit = 10, name = '', sortBy = '' }: FetchHotelsParams,
  ): PlaceHotels[] {
    const allHotels = this.flattenAndTransformHotels(places, name, sortBy)

    if (allHotels.length === 0) {
      return []
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedHotels = allHotels.slice(startIndex, endIndex)
    return this.aggregateHotelsByPlace(paginatedHotels)
  }
}
