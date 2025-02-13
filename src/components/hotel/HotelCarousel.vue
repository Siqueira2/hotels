<template>
  <q-carousel
      v-model="slide"
      animated
      arrows
      navigation
      infinite
      :autoplay="10000"
      :style="getHeightStyle"
    >
      <q-carousel-slide
        v-for="(image, index) in hotel.getImages"
        :key="index"
        :name="index"
        :style="getHeightStyle"
        class="q-pa-none overflow-hidden"
      >
        <q-img :src="image" basic class="full-width" :style="getHeightStyle" fit="cover" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Hotel } from 'src/models'

const props = defineProps<{
  hotel: Hotel
  height?: number
}>()

const slide = ref(0)

const getHeightStyle = computed(() => {
  const carouselHeight = props.height || 256

  return `height: ${carouselHeight}px`
})
</script>
