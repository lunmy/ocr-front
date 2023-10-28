<template>
    <NuxtPage />
</template>
<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'client'
})
</script>
