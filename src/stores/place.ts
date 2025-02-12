import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchPlaces as fetchPlacesApi } from 'src/api'
import type { Place } from 'src/models/place'

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
