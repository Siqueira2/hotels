<template>
  <q-infinite-scroll @load="onLoad">
    <div v-if="loading" class="row justify-center q-my-md">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <template v-else-if="hotels.length">
      <HotelCard
        v-for="hotel in hotels"
        :key="hotel.getId"
        :hotel="hotel as Hotel"
        @select="openDrawer"
      />
    </template>

    <div v-else class="row justify-center q-my-md">
      <p class="text-grey-2">{{ $t('hotels.no-hotels') }}</p>
    </div>

    <template #loading>
      <div v-if="loading || loadingNextPage" class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>

  <HotelDrawer v-if="selectedHotel" :hotel="selectedHotel as Hotel" v-model="drawerOpen" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import { useHotelStore } from 'src/stores/hotel'
import type { Hotel } from 'src/models'

import HotelCard from 'src/components/hotel/HotelCard.vue'
import HotelDrawer from 'src/components/hotel/HotelDrawer.vue'

const route = useRoute()
const hotelStore = useHotelStore()
const { hotels } = storeToRefs(hotelStore)

const page = ref(1)
const loading = ref(true)
const loadingNextPage = ref(false)
const drawerOpen = ref(false)
const selectedHotel = ref<Hotel | null>(null)

const fetchHotels = async (params: { page: number }) => {
  await hotelStore.fetchHotels({
    page: params.page,
    name: route.query.name as string,
    sortBy: route.query.sort as string,
  })
}

const onLoad = async (_: number, done: VoidFunction) => {
  if (!loading.value) {
    loadingNextPage.value = true
    page.value++
    await fetchHotels({ page: page.value })
    loadingNextPage.value = false
  }
  done()
}

const openDrawer = (hotel: Hotel) => {
  selectedHotel.value = hotel
  drawerOpen.value = true
}

onMounted(async () => {
  loading.value = true
  await fetchHotels({ page: page.value })
  loading.value = false
})

watch(
  () => route.query,
  async () => {
    page.value = 1
    loading.value = true
    await fetchHotels({ page: 1 })
    loading.value = false
  },

  { deep: true },
)
</script>
