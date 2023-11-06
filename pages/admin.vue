<template>
  <NuxtPage />
</template>
<script setup>
definePageMeta({
  middleware: ['auth','admin'],
  layout: 'admin'
})
</script>
