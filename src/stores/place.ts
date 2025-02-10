import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Place } from 'src/interfaces'

import { fetchPlaces as fetchPlacesApi } from 'src/api'

export const usePlaceStore = defineStore('place', () => {
  const places = ref<Place[]>([])

  const fetchPlaces = async () => {
    try {
      const response = await fetchPlacesApi()
      places.value = response
    } catch (error) {
      return error
    }
  }

  return {
    places,
    fetchPlaces,
  }
})
