<template>
  <div>
    <HotelCard
      v-for="hotel in hotels"
      :key="hotel.getId"
      :hotel="hotel as Hotel"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useHotelStore } from 'src/stores/hotel'

import HotelCard from 'src/components/hotel/HotelCard.vue'

import type { Hotel } from 'src/models/hotel'

const hotelStore = useHotelStore()
const { hotels } = storeToRefs(hotelStore)

onMounted(async () => {
  await hotelStore.fetchHotels()
})
</script>