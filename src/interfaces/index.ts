export enum AmenitiesEnum {
  WI_FI = 'wifi',
  RESTAURANT = 'restaurant',
  ROOM_SERVICE = 'room_service',
  MEETING_ROOM = 'meeting_room',
  LAUNDRY = 'local_laundry_service',
  BREAKFAST = 'bakery_dining',
  PARKING = 'local_parking',
  FITNESS_CENTER = 'fitness_center',
  POOL = 'pool',
  SPA = 'self_improvement',
  STEAM_ROOM = 'hot_tub',
  PETS = 'pets',
  PUB = 'sports_bar',
  AIR_CONDITIONING = 'ac_unit',
  SAFE = 'lock',
  ROOM_TV = 'tv',
  RECEPTION_24_HOURS = 'timer',
  STAGE = 'vertical_shades',
  AUDITORIUM = 'vertical_shades_closed',
  MASSAGE = 'spa',
  PLAY_GROUND = 'mood',
  TRANSFER = 'cases',
}

export interface State {
  name: string
  shortname: string
}

export interface Place {
  state: State
  name: string
  placeId: number
}

export interface Amenity {
  key: keyof typeof AmenitiesEnum
  label: string
}

export interface PlaceHotels {
  placeId: number
  hotels: Hotel[]
}

export interface Address {
  fullAddress: string
  city: string
  district: string
  street: string
  state: string
  number: string
  country: string
  zipCode: string | null
}

export interface Hotel {
  id: number
  favorite: boolean
  name: string
  description: string
  stars: string
  thumb: string
  amenities: Amenity[] | null
  hasBreakFast: boolean
  hasRefundableRoom: boolean
  hasAgreement: boolean
  nonRefundable: boolean | null
  address: Address
  images: string[]
  deals: unknown
  roomsQuantity: number
  price: number
}

export interface FetchHotelsParams {
  page?: number
  limit?: number
  name?: string
  sortBy?: string
}
