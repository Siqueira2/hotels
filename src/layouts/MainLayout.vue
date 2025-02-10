<template>
  <q-layout view="hHr lpR fFr">
    <q-header class="bg-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="row items-center q-pa-sm">
            <img :src="logo" :alt="$t('header.logo')" style="width: 150px" />
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import logo from 'src/assets/logo.svg'
</script>

<style lang="scss" scoped>
.q-toolbar__title {
  flex: none;
}
</style>
