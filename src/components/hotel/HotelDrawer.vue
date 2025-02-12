<template>
  <div
    v-if="isDrawerOpen"
    @click="isDrawerOpen = false"
    class="absolute-top-left full-width full-height backdrop"
  />

  <q-drawer overlay v-model="isDrawerOpen" side="right" bordered :width="800">
    <q-card flat>
      <q-card-section>
        <div>
          <span class="text-grey-6 text-caption">{{ hotel.getStars }}</span>

          <span class="text-yellow-8 q-ml-xs">{{ hotel.getStarRating }}</span>
        </div>

        <h5 class="text-grey-2 q-ma-none text-weight-regular">
          {{ hotel.getName }}
        </h5>

        <p class="text-subtitle2 text-grey-5 q-ma-none text-weight-regular">
          {{ hotel.getLocation }}
        </p>
      </q-card-section>

      <q-carousel
        v-model="slide"
        animated
        arrows
        navigation
        infinite
        :autoplay="10000"
        class="q-mx-md"
        style="height: 400px"
      >
        <q-carousel-slide
          v-for="(image, index) in hotel.getImages"
          :key="index"
          :name="index"
          style="height: 400px"
          class="q-pa-none overflow-hidden"
        >
          <q-img :src="image" basic class="full-width" style="height: 400px" fit="cover" />
        </q-carousel-slide>
      </q-carousel>

      <q-card-section v-if="hotel.hasAmenities">
        <h6 class="text-grey-2 q-mt-none q-mb-md text-weight-regular">
          {{ t('hotels.hotel.drawer.amenities-title') }}
        </h6>
        <q-separator />

        <div class="row q-gutter-x-xl q-my-md" data-testid="hotel-amenities">
          <div v-for="amenity in getHotelAmenities" :key="amenity.key" class="row q-mb-sm">
            <q-icon :name="getAmenityIcon(amenity.key)" size="xs" color="grey-6" class="q-mr-sm" />

            <p class="text-grey-6 q-mb-none">{{ amenity.label }}</p>
          </div>
        </div>

        <div v-if="showAmenitiesButton" class="w-full flex justify-center q-mb-md">
          <q-btn
            color="primary"
            :label="getAmenitiesButtonLabel"
            outline
            rounded
            @click="showAmenities = !showAmenities"
          />
        </div>

        <q-separator />
      </q-card-section>

      <q-card-section class="q-py-none">
        <h6 class="text-grey-2 q-mt-none q-mb-md text-weight-regular">
          {{ t('hotels.hotel.drawer.description') }}
        </h6>

        <p class="text-grey-5" data-testid="hotel-description">
          {{ hotel.getDescription }}
        </p>
      </q-card-section>
    </q-card>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Hotel } from 'src/models/hotel'

import { AmenitiesEnum } from 'src/enums'

const { t } = useI18n()

const { hotel, modelValue } = defineProps<{
  hotel: Hotel
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const slide = ref(0)
const showAmenities = ref(false)
const amenitiesLimit = ref(4)

const getHotelAmenities = computed(() => {
  return showAmenities.value
    ? hotel.getAmenities
    : hotel.getAmenities?.slice(0, amenitiesLimit.value)
})

const showAmenitiesButton = computed(() => {
  if (hotel.getAmenities?.length) {
    return hotel.getAmenities?.length > amenitiesLimit.value
  }

  return false
})

const getAmenitiesButtonLabel = computed(() => {
  return showAmenities.value
    ? t('hotels.hotel.drawer.show-less')
    : t('hotels.hotel.drawer.show-all')
})

const isDrawerOpen = computed({
  get: () => modelValue,
  set: (value) => emit('update:modelValue', value),
})

const getAmenityIcon = (amenity: keyof typeof AmenitiesEnum) => {
  return AmenitiesEnum[amenity] || 'mdi-help'
}
</script>

<style scoped lang="scss">
.backdrop {
  background-color: $dark;
  opacity: 0.7;
}

.q-carousel {
  border-radius: 16px !important;
}
</style>
