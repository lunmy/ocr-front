<template>
  <snack></snack>
  <h1 class="text-3xl my-6">Nouveau client</h1>
  <ClientForm :client="client" :is-loading="loading"
              @validated="submitForm"/>
</template>
<script setup>

import {errorToast,successToast} from "@/composables/toast";
import ClientForm from "@/components/ClientForm.vue";
const {$crmApi} = useNuxtApp()
const router = useRouter();

const loading=ref(false)
const client=ref({
  gender: 'MR',
  firstname: 'Jean',
  lastname: 'Dupond',
  email: 'jd@gmail.com',
  address: {
    city: 'Lille',
    zipcode: '59000',
    street: '134 rue royale',
    complement: '',
  },
  phone: '0328000000',
})
 async function submitForm(data) {
  loading.value = true
  await $crmApi.createCustomer({user: data.client}).then(response => {
    router.push('/admin/client')
    successToast('Le client a bien été enregistré')
  }).catch((error) => {
     errorToast('Une erreur est survenue lors de l\'enregistrement du client : '+error.response.data.detail)
     console.log(error.response.data.detail)
   }).finally(() => {
     loading.value = false
   })
}

</script>
