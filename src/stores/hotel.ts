import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchPlaceHotels } from 'src/api/hotels'

import type { Hotel as HotelModel } from 'src/models'
import type { FetchHotelsParams } from 'src/interfaces'

export const useHotelStore = defineStore('hotels', () => {
  const hotels = ref<HotelModel[]>([])

  const fetchHotels = async ({
    page = 1,
    limit = 10,
    name = '',
    sortBy = '',
  }: FetchHotelsParams) => {
    const response = await fetchPlaceHotels({ page, limit, name, sortBy })
    const newHotelsData = response.flatMap(({ hotels }) => hotels)

    if (page === 1) {
      return (hotels.value = newHotelsData)
    }

    hotels.value.push(...newHotelsData)
  }

  return {
    hotels,
    fetchHotels,
  }
})
