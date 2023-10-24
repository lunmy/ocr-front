<template>
  <h1 class="text-3xl">Nouveau client</h1>
  <ClientForm :client="client"
              @validated="submitForm"/>
</template>
<script setup>

import {errorToast,successToast} from "@/composables/toast";
import moment from 'moment'
import ClientForm from "../../../components/ClientForm.vue";
const {$crmApi} = useNuxtApp()
const router = useRouter();

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const client=ref({
  gender: 'M',
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
console.log(data)
  await $crmApi.createCustomer(data.client).then(response => {
    successToast('Le client a bien été enregistré')
    router.push('/admin/client')
  }).catch((error) => {
     errorToast('Une erreur est survenue lors de l\'enregistrement du client')
     console.log(error)
   })
}

</script>
