export enum AmenitiesEnum {
  BREAKFAST = 'bakery_dining',
  RESTAURANT = 'restaurant',
  ROOM_SERVICE = 'room_service',
  PUB = 'sports_bar',
  ROOM_TV = 'tv',
  AIR_CONDITIONING = 'ac_unit',
  WI_FI = 'wifi',
  SAFE = 'lock',
  RECEPTION_24_HOURS = 'timer',
  PARKING = 'local_parking',
  LAUNDRY = 'local_laundry_service',
  MEETING_ROOM = 'meeting_room',
  AUDITORIUM = 'vertical_shades_closed',
  STAGE = 'vertical_shades',
  FITNESS_CENTER = 'fitness_center',
  POOL = 'pool',
  SPA = 'self_improvement',
  STEAM_ROOM = 'hot_tub',
  MASSAGE = 'spa',
  PLAY_GROUND = 'mood',
  PETS = 'pets',
  TRANSFER = 'cases',
}

export interface Amenity {
  key: keyof typeof AmenitiesEnum
  label: string
}
