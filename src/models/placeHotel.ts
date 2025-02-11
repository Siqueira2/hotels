import type { PlaceHotels } from 'src/interfaces'
import { Hotel as HotelModel } from './hotel'

export class PlaceHotelModel {
  placeId: number
  hotels: HotelModel[]

  constructor(placeHotels: PlaceHotels) {
    this.placeId = placeHotels.placeId
    this.hotels = placeHotels.hotels.map((hotel) => new HotelModel(hotel))
  }
}
