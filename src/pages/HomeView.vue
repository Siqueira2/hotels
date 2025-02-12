<template>
  <div class="row justify-center q-pa-md">
    <div class="col-12 col-md-8">
      <PlaceSelector />

      <div class="row justify-end q-mt-md">
        <SortSelector />
      </div>

      <HotelList />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceSelector from 'src/components/PlaceSelector.vue'
import HotelList from 'src/components/hotel/HotelList.vue'
import SortSelector from 'src/components/SortSelector.vue'
</script>
