<template>
  <h1 class="text-3xl my-6">Modifier client</h1>
  <div v-if="loading && client === null" class="lg:grid grid-cols-2 gap-5">
    <v-skeleton-loader
        width="100%"
        class="mx-auto"
        elevation="2"
        type="heading"
    ></v-skeleton-loader>
    <v-skeleton-loader
        width="100%"
        class="mx-auto"
        elevation="2"
        type="heading"
    ></v-skeleton-loader>
    <v-skeleton-loader
        width="100%"
        class="mx-auto"
        elevation="2"
        type="heading"
    ></v-skeleton-loader>
    <v-skeleton-loader
        width="100%"
        class="mx-auto"
        elevation="2"
        type="heading"
    ></v-skeleton-loader>
    <v-skeleton-loader
        width="100%"
        class="mx-auto"
        elevation="2"
        type="heading"
    ></v-skeleton-loader>
    <v-skeleton-loader
        width="100%"
        class="mx-auto"
        elevation="2"
        type="heading"
    ></v-skeleton-loader>
    <v-skeleton-loader
        width="100%"
        class="mx-auto"
        elevation="0"
        type="actions"
    ></v-skeleton-loader>
  </div>

  <ClientForm v-if="client != null" :client="client.user" :is-loading="loading" @validated="submitForm"/>
</template>
<script setup>

import {errorToast,successToast} from "@/composables/toast";
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import ClientForm from "@/components/ClientForm";
const {$crmApi} = useNuxtApp()
const router = useRouter();
const route = useRoute()

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const loading = ref(false)
const client=ref(null)

onMounted(async () => {
  loading.value = true
  const id = route.params.id
  await $crmApi.getCustomer(id).then().then(response => {
    client.value = response
  }).catch(error => {
    errorToast('Une erreur est survenue lors de l\'enregistrement du client ' + error.response.data.detail)
    console.log(error.response.data.detail)
  }).
  finally(() => {
    loading.value = false
  })
})
async function submitForm(data) {
 loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
  await $crmApi.updateCustomer(data.client).then(response => {
    successToast('Le client a bien été modifié')
    router.push('/admin/client')
  }).catch((error) => {
    errorToast('Une erreur est survenue lors de l\'enregistrement du client ' + error.response.data.detail)
    console.log(error.response.data.detail)
  })
}

</script>
