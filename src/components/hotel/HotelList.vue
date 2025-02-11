<template>
  <q-infinite-scroll @load="onLoad">
    <HotelCard v-for="hotel in hotels" :key="hotel.getId" :hotel="hotel as Hotel" />

    <template #loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useHotelStore } from 'src/stores/hotel'
import type { Hotel } from 'src/models/hotel'

import HotelCard from 'src/components/hotel/HotelCard.vue'

const hotelStore = useHotelStore()
const { hotels } = storeToRefs(hotelStore)
const page = ref(1)

const onLoad = async (_: number, done: VoidFunction) => {
  page.value++
  await hotelStore.fetchHotels(page.value)
  done()
}

onMounted(async () => {
  await hotelStore.fetchHotels()
})
</script>
