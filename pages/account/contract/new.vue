<template>
  <h1 class="text-3xl my-6">Nouveau contrat</h1>
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
      <v-file-input
          v-model="contractFile"
          accept="image/*, application/pdf"
          label="Contrat"
          class="col-span-2"
          variant="outlined"
          multiple="false"
          prepend-inner-icon="mdi-paperclip"
          :prepend-icon="null"
          :rules="[fileRule]"
      ></v-file-input>
    </div>
    <loading-button :is-loading="loading" @button-clicked="submit" class="w-64 mb-2 mt-4 "/>
  </v-form>

</template>
<script setup>
import LoadingButton from "@/components/LoadingButton.vue";
import {errorToast} from "@/composables/toast";
import {getIdFromIri} from "@/composables/utils";

const {$crmApi} = useNuxtApp()
import {textRule, fileRule} from "@/composables/rules";
const router = useRouter();
const route = useRoute()


const loading = ref(false)
const contract = ref({
  name: '',
})
const contractFile = ref([])
const form = ref(null)

function submit(){
  loading.value = true
  const promise = form.value.validate()
  promise.then(async (success) => {
    if (success.valid) {
      const formData = new FormData()
      formData.append('contract', contractFile.value[0])
      formData.append('name', contract.value.name)
      await $crmApi.createContract(formData).then().then(response => {
        successToast('Le contrat a bien été crée')
        console.log(response)
        router.push('/account/contract/' + getIdFromIri(response['@id']) + '/detail')
      }).catch( error => {
        errorToast('Une erreur est survenue lors de la création du contrat ' + error.response.data.detail)
      }).finally(
        () => {
          loading.value = false
        }
      )
    }
  })
}


</script>
