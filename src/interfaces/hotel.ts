import type { Amenity } from './amenity'

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
