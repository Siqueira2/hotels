import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchPlaceHotels } from 'src/api/hotels'

import type { Hotel as HotelModel } from 'src/models/hotel'

export const useHotelStore = defineStore('hotels', () => {
  const hotels = ref<HotelModel[]>([])

  const fetchHotels = async (page: number = 1, limit: number = 10) => {
    const response = await fetchPlaceHotels({ page, limit })
    const newHotelsData = response.flatMap(({ hotels }) => hotels)

    if (page === 1) {
      return (hotels.value = newHotelsData)
    }

    hotels.value.push(...newHotelsData)
  }

  const getRecommendedHotels = () => {
    return hotels.value
      .filter((hotel) => hotel.getHasBreakfast && hotel.hasAmenities)
      .sort((a, b) => b.getPrice - a.getPrice)
      .slice(0, 5)
  }

  const getBestRatedHotels = () => {
    return hotels.value.sort((a, b) => Number(b.getStars) - Number(a.getStars)).slice(0, 5)
  }

  return {
    hotels,
    fetchHotels,
    getRecommendedHotels,
    getBestRatedHotels,
  }
})
