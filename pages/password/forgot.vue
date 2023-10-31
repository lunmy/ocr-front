<template>
  <v-form ref="loginForm" class="bg-white xl:w-1/2 w-full px-8">
    <div class="flex justify-center mb-5">
      <img src="/img/logo.svg" alt="logo" class="w-20 h-20 mr-2 inline-block"/>
    </div>
    <h1 class="text-3xl mt-6 mb-2 text-center w-full">Mot de passe oublié</h1>
    <v-text-field
        v-model="email"
        label="Email"
        :rules="[textRule, emailRule]"
        rounded=50
        prepend-inner-icon="mdi-email"
        variant="outlined"
        class="w-full mt-5 rounded-2xl"
        required
    />
    <loading-button label="Valider" :is-loading="isLoading" @button-clicked="submitEmail"
                    class="w-full"/>
    <div v-if="_errorMessage !== ''"
         class="text-center text-validation-error mx-4">
      <span class="text-lg">{{ _errorMessage }}</span> <br/>
    </div>
  </v-form>
</template>
<script setup>
import LoadingButton from "@/components/LoadingButton.vue";
import {textRule, emailRule} from "@/composables/rules";
import {errorToast, successToast} from "@/composables/toast";

import {ref} from "vue";

definePageMeta({
  layout: 'login'
})

const router = useRouter();
const config = useRuntimeConfig()
const {$authApi} = useNuxtApp()

const _errorMessage = ref('');
const email = ref('');
const loginForm = ref(null);
const isLoading = ref(false);

async function submitEmail() {
  const promise = loginForm.value.validate()
  promise.then(async (success) => {
    if (success.valid) {
      isLoading.value = true
      await $authApi.passwordToken({
        username: email.value,
        app: config.public.applicationId
    }).then(response => {
        successToast(response.data)
    }).catch(error => {
      _errorMessage.value = error.message
      errorToast('Une erreur est survenue')
    }).finally(() => {
        isLoading.value = false
      });
    }
  })
}
</script>
