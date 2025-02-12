import type { Hotel as HotelType, Address, Amenity } from 'src/interfaces'

import { formatCurrency } from 'src/helpers'

export class Hotel {
  private id: number
  private name: string
  private description: string
  private stars: string
  private thumb: string
  private favorite: boolean
  private price: number
  private address: Address
  private amenities: Amenity[] | null
  private hasBreakFast: boolean
  private hasRefundableRoom: boolean
  private hasAgreement: boolean
  private nonRefundable: boolean | null
  private roomsQuantity: number
  private images: string[]

  constructor(hotel: HotelType) {
    this.id = hotel.id
    this.name = hotel.name
    this.description = hotel.description
    this.stars = hotel.stars
    this.thumb = hotel.thumb
    this.favorite = hotel.favorite
    this.price = hotel.price
    this.address = hotel.address
    this.amenities = hotel.amenities
    this.hasBreakFast = hotel.hasBreakFast
    this.hasRefundableRoom = hotel.hasRefundableRoom
    this.hasAgreement = hotel.hasAgreement
    this.nonRefundable = hotel.nonRefundable
    this.roomsQuantity = hotel.roomsQuantity
    this.images = hotel.images
  }

  public get getId(): number {
    return this.id
  }

  public get getName(): string {
    return this.name
  }

  public get getDescription(): string {
    return this.description
  }

  public get getStarRating(): string {
    return '★'.repeat(Number(this.stars))
  }

  public get getLocation(): string {
    return `${this.address.fullAddress}, ${this.address.city}, ${this.address.state}, ${this.address.zipCode || 'N/A'}`
  }

  public get isFavorite(): boolean {
    return this.favorite
  }

  public get hasAmenities(): boolean {
    return this.amenities !== null && this.amenities.length > 0
  }

  public get getPrice(): string {
    return formatCurrency(this.price)
  }

  public get getHasBreakfast(): boolean {
    return this.hasBreakFast
  }

  public get getStars(): string {
    return this.stars
  }

  public get getThumb(): string {
    return this.thumb
  }

  public get getImages(): string[] {
    return this.images
  }

  public get isRefundable(): boolean {
    return this.hasRefundableRoom && !this.nonRefundable
  }

  public get isAgreement(): boolean {
    return this.hasAgreement
  }

  public get getRoomsQuantity(): number {
    return this.roomsQuantity
  }

  public get getAmenities(): Amenity[] | null {
    return this.amenities
  }

  public get getPricePerNight(): string {
    return formatCurrency(Number(this.price / this.roomsQuantity))
  }
}
