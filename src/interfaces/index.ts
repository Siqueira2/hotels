import type { AmenitiesEnum } from 'src/enums'

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
