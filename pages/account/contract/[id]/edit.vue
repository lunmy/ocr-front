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
      <v-skeleton-loader
          width="100%"
          class="mx-auto"
          elevation="0"
          type="actions"
      ></v-skeleton-loader>
    </div>
  </div>
  <div v-if="contract != null">
    <h1 class="text-3xl my-6">Modification du contrat</h1>
    <v-form ref="form">
    <div class="xl:grid xl:grid-cols-2 xl:gap-12 ">
      <v-text-field
          v-model="contract.name"
          :rules="[textRule]"
          label="Nom du contrat"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
          class="col-span-2"
      ></v-text-field>
      <date-picker
          label="Date de début"
          :date="contract.startDate"
          @updateDate="updateStartDate"
      ></date-picker>
      <date-picker
          label="Date de fin"
          :date="contract.endDate"
          @updateDate="updateEndDate"
      ></date-picker>
      <embed :src="contract.files[0]" height="900px" class="w-full"/>
      <div>
        <v-textarea
            v-model="contract.content"
            label="Contrat *"
            :rules="[textRule]"
            rounded=50
            variant="outlined"
            class="w-full mt-5 rounded-2xl"
            required
            height="900"
        />
      </div>
    </div>
      <div class="col-span-2 flex justify-start">
      <loading-button :is-loading="loading" @button-clicked="submit" class="w-64 mb-2 mt-4 "/>
      <v-btn @click="$router.push('/account')" class="w-64 ml-6 mb-2 mt-4 ">Retour</v-btn>
      </div>
    </v-form>
  </div>
</template>
<script setup>
import {errorToast} from "@/composables/toast";
import {VSkeletonLoader} from 'vuetify/labs/VSkeletonLoader'
import DatePicker from "@/components/DatePicker.vue";
import moment from 'moment'
import LoadingButton from "../../../../components/LoadingButton.vue";


const {$crmApi} = useNuxtApp()
const router = useRouter();
const route = useRoute()

const loading = ref(false)
const contract = ref(null)
const pdf = ref(null)
const form = ref(null)


onMounted(async () => {
  loading.value = true
  const id = route.params.id
  await $crmApi.getContract(id).then().then(response => {
    contract.value = response
    pdf.value = response.files[0]
  }).catch(error => {
    errorToast('Une erreur est survenue lors du chargement du contrat ' + error.response.data.detail)
    console.log(error.response.data.detail)
  }).finally(() => {
    loading.value = false
  })
});

function updateStartDate(date) {
  contract.value.startDate = date
}

function updateEndDate(date) {
  contract.value.endDate = date
}

function submit(){
  loading.value = true
  const promise = form.value.validate()
  promise.then(async (success) => {
    if (success.valid) {
      await $crmApi.updateContract(contract.value).then().then(response => {
        successToast('Le contrat a bien été modifié')
        router.push('/account')
      }).catch( error => {
        errorToast('Une erreur est survenue lors de la modification du contrat ' + error.response.data.detail)
      }).finally(
        loading.value = false
      )
    }
  })
}

</script>
