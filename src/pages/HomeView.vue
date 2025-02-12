<template>
  <q-page-container class="row justify-center">
    <div class="col-12 col-md-8">
      <PlaceSelector />

      <div class="row justify-end q-mt-md">
        <SortSelector />
      </div>

      <HotelList />
    </div>
  </q-page-container>
</template>

<script setup lang="ts">
import PlaceSelector from 'src/components/PlaceSelector.vue'
import HotelList from 'src/components/hotel/HotelList.vue'
import SortSelector from 'src/components/SortSelector.vue'
</script>

<style scoped lang="scss">
.q-page-container {
  min-height: 100vh;
}
</style>
