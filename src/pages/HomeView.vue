<template>
  <q-page-container class="row justify-center">
    <div class="col-12 col-md-8">
      <PlaceSelector />

      <div class="row justify-between q-mt-md">
        <BreadCrumb />
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
import BreadCrumb from 'src/components/BreadCrumb.vue'
</script>

<style scoped lang="scss">
.q-page-container {
  min-height: 100vh;
}
</style>
