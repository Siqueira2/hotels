<template>
  <q-card flat class="q-mt-md row">
    <q-carousel
      class="col-12 col-sm-3"
      v-model="slide"
      animated
      arrows
      navigation
      infinite
      :autoplay="10000"
      style="height: 256px"
    >
      <q-carousel-slide
        v-for="(image, index) in hotel.getImages"
        :key="index"
        :name="index"
        style="height: 256px"
        class="q-pa-none overflow-hidden"
      >
        <q-img :src="image" basic class="full-width" style="height: 256px" fit="cover" />
      </q-carousel-slide>
    </q-carousel>

    <q-card-section class="col-12 col-sm-5 col-md-6">
      <h6 class="text-grey-2 q-ma-none text-weight-regular">
        {{ hotel.getName }}
      </h6>

      <p class="text-subtitle2 text-grey-5 q-ma-none text-weight-regular">
        {{ hotel.getLocation }}
      </p>

      <div class="row">
        <div class="col-12 q-mt-sm">
          <div class="row items-center">
            <span class="text-grey-6 text-caption">{{ hotel.getStars }}</span>
            <span class="text-yellow-8 q-ml-xs">{{ hotel.getStarRating }}</span>

            <q-separator vertical color="grey-6" class="q-mx-sm" />

            <template v-if="hotel.hasAmenities">
              <q-icon
                v-for="amenity in hotel.getAmenities"
                :key="amenity.key"
                :name="getAmenityIcon(amenity.key)"
                size="xs"
                color="grey-6"
                class="q-mr-sm"
              >
                <q-tooltip>{{ amenity.label }}</q-tooltip>
              </q-icon>
            </template>
          </div>
        </div>
      </div>

      <q-chip
        v-if="hotel.isRefundable"
        color="grey-6"
        text-color="white"
        size="sm"
        square
        class="q-mx-none q-mt-sm"
      >
        {{ t('hotels.hotel.refundable') }}
      </q-chip>
    </q-card-section>

    <q-card-section class="col-12 col-sm-4 col-md-3">
      <div class="text-grey-5 text-weight-regular">
        <p class="q-ma-none text-weight-regular">
          {{ t('hotels.hotel.from') }}
        </p>

        <h5 class="text-grey-2 q-ma-none">
          <span class="text-caption">{{ t('shared.currency') }}</span>

          <span class="text-weight-semibold">{{ hotel.getPrice.toFixed(2) }}</span>
        </h5>

        <p class="text-grey-6 text-caption q-ma-none">
          <span>{{ $t('shared.currency') }}</span>

          {{ getPricePerNightText }}
        </p>

        <p class="text-grey-6 text-subtitle2 text-weight-semibold">
          {{ t('hotels.hotel.included-taxes') }}
        </p>
      </div>

      <q-btn
        color="primary"
        :label="$t('shared.actions.select')"
        rounded
        unelevated
        class="q-mt-lg"
        @click="$emit('select', hotel)"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Hotel } from 'src/models/hotel'
import { AmenitiesEnum } from 'src/enums'

const { hotel } = defineProps<{
  hotel: Hotel
}>()

const { t } = useI18n()

const slide = ref(0)

const getPricePerNightText = computed(() =>
  t('hotels.hotel.price-per-night', { price: hotel.getPricePerNight }),
)

const getAmenityIcon = (amenity: keyof typeof AmenitiesEnum) => {
  return AmenitiesEnum[amenity] || 'mdi-help'
}

defineEmits<{
  select: [hotel: Hotel]
}>()
</script>

<style scoped lang="scss">
.q-carousel {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: inherit !important;
}

.q-card__section:last-child {
  border-left: 2px solid $grey-1 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
