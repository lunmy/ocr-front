<template>
  <NuxtPage />
</template>
<script setup>
definePageMeta({
  middleware: ['auth','admin'],
  layout: 'client'
})
</script>
