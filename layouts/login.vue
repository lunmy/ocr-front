<template>
  <div class="h-screen md:flex">
    <div
        class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-secondary-0 justify-around items-center hidden">
      <div>
        <h1 class="text-white font-bold text-4xl font-sans">OCR App</h1>
        <p class="text-white mt-1">Gestion de contrats en ligne</p>

      </div>
      <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    </div>
    <div class="flex xl:w-1/2 justify-center py-10 items-center bg-white h-full flex-col">
      <NuxtPage/>
    </div>
  </div>
</template>
<script setup>
import LoadingButton from "../components/LoadingButton.vue";
</script>
