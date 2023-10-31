<template>
  <v-form ref="loginForm" class="bg-white xl:w-1/2 w-full px-8">
    <div class="flex justify-center mb-5">
      <img src="/img/logo.svg" alt="logo" class="w-20 h-20 mr-2 inline-block"/>
    </div>
    <h1 class="text-3xl mt-6 mb-2 text-center w-full">Nouveau mot de passe</h1>
    <v-text-field
        :type="showPass ? 'text' : 'password'"
        v-model="password"
        label="Mot de passe"
        :rules="[textRule, passwordRule]"
        rounded=50
        prepend-inner-icon="mdi-lock"
        variant="outlined"
        class="w-full mt-5 rounded-2xl"
        :appendInnerIcon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        @click:appendInner="showPass = !showPass"
        required
    />

    <v-text-field
        :type="showConfirm ? 'text' : 'password'"
        type="password"
        v-model="confirm"
        label="Confirmation"
        :rules="[sameRule()]"
        rounded=50
        prepend-inner-icon="mdi-lock-reset"
        variant="outlined"
        class="w-full mt-5 rounded-2xl"
        required
        :appendInnerIcon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
        @click:appendInner="showConfirm = !showConfirm"
    />
    <loading-button label="Valider" :is-loading="isLoading" @button-clicked="submitPassword"
                    class="w-full"/>
    <div v-if="_errorMessage !== ''"
         class="text-center text-validation-error mx-4">
      <span class="text-lg">{{ _errorMessage }}</span> <br/>
    </div>
  </v-form>
</template>
<script setup>
import LoadingButton from "@/components/LoadingButton.vue";
import {textRule, passwordRule} from "@/composables/rules";
import {errorToast, successToast} from "@/composables/toast";
import {ref} from "vue";

definePageMeta({
  layout: 'login'
})

const router = useRouter();
const route = useRoute();
const {$authApi} = useNuxtApp()
const config = useRuntimeConfig()

const password = ref('');
const confirm = ref('');
const loginForm = ref(null);
const isLoading = ref(false);
const _errorMessage = ref('');
const showPass = ref(false);
const showConfirm = ref(false);

async function submitPassword() {
  const promise = loginForm.value.validate()
  promise.then(async (success) => {
    if (success.valid) {
      const credentials = {
        token: route.params.id,
        password: password.value
      }
      isLoading.value = true
      await $authApi.resetPassword(credentials).then((response) => {
        successToast('Le mot de passe a bien été modifié')
        router.push('/login')
      }).catch((error) => {
        errorToast('Une erreur est survenue')
        console.log(error)
      }).finally(() => {
        isLoading.value = false
      })
    }
  })
}

function sameRule() {
  return (v) => v === password.value || 'Les mots de passe ne sont pas identiques'
}

</script>
