<template>
  <q-infinite-scroll @load="onLoad">
    <template v-if="hotels.length">
      <HotelCard v-for="hotel in hotels" :key="hotel.getId" :hotel="hotel as Hotel" />
    </template>

    <div v-else-if="loading" class="row justify-center q-my-md">
      <q-spinner-dots class="q-my-md" color="primary" size="40px" />
    </div>

    <div v-else class="row justify-center q-my-md">
      <p class="text-grey-2">{{ $t('hotels.no-hotels') }}</p>
    </div>

    <template #loading>
      <div v-if="!loading && loadingNextPage" class="row justify-center q-my-md">
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
const loading = ref(true)
const loadingNextPage = ref(false)

const onLoad = async (_: number, done: VoidFunction) => {
  loadingNextPage.value = true
  page.value++
  await hotelStore.fetchHotels(page.value)
  loadingNextPage.value = false
  done()
}

onMounted(async () => {
  loading.value = true
  await hotelStore.fetchHotels()
  loading.value = false
})
</script>
