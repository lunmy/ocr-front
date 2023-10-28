<template>
  <div v-if="loading">
    <v-skeleton-loader
        class="w-full xl:w-96"
        elevation="0"
        type="heading"
    ></v-skeleton-loader>
    <div class="flex justify-between xl:w-1/3">
      <v-skeleton-loader
          class="w-96"
          elevation="0"
          type="heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
          class="w-96"
          elevation="0"
          type="heading"
      ></v-skeleton-loader>
    </div>
    <div class="xl:grid xl:grid-cols-2">
      <v-skeleton-loader
          class="w-full"
          elevation="0"
          type="image"
      ></v-skeleton-loader>
      <v-skeleton-loader
          class="w-full"
          elevation="0"
          type="paragraph"
      ></v-skeleton-loader>
    </div>
  </div>
  <div v-if="contract != null">
    <h1 class="text-3xl my-6">{{ contract.name }}</h1>
    <div class="xl:flex justify-start">
      <div class="text-xl font-bold">
        Du {{ moment(contract.startDate).format('DD/MM/YYYY') }}
        au {{ moment(contract.endDate).format('DD/MM/YYYY') }}
      </div>
    </div>
    <div class="xl:grid xl:grid-cols-2 xl:gap-12 my-6">
    <div>
      <embed :src="contract.files[0]" height="900px" class="w-full" />
    </div>
      <div>
        {{ contract.content }}
      </div>
    </div>
    <v-btn @click="$router.push('/account')" class="w-64 ml-6 mb-2 mt-4 ">Retour</v-btn>
  </div>
</template>
<script setup>
import {errorToast} from "@/composables/toast";
import {VSkeletonLoader} from 'vuetify/labs/VSkeletonLoader'
import moment from 'moment'
import { VuePDF, usePDF } from '@tato30/vue-pdf'


const {$crmApi} = useNuxtApp()
const router = useRouter();
const route = useRoute()

const loading = ref(false)
const contract = ref(null)
const pdf = ref(null)

onMounted(async () => {
  loading.value = true
  const id = route.params.id
  await $crmApi.getContract(id).then().then(response => {
    contract.value = response
    pdf.value = response.files[0]
  }).catch(error => {
    errorToast('Une erreur est survenue lors du chargement du contrat ' + error.response.data.detail)
    console.log(error.response.data.detail)
  }).
  finally(() => {
    loading.value = false
  })
});


</script>
