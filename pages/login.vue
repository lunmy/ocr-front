<template>
  <div class="h-screen md:flex">
    <div
        class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-secondary-0 justify-around items-center hidden">
      <div>
        <h1 class="text-white font-bold text-4xl font-sans">OCR App</h1>
        <p class="text-white mt-1">Gestion de contrats en ligne</p>

      </div>
      <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    </div>
    <div class="flex xl:w-1/2 justify-center py-10 items-center bg-white h-full">
      <v-form ref="loginForm" class="bg-white xl:w-1/2 w-full px-8">
        <div class="flex justify-center mb-5">
          <img src="/img/logo.svg" alt="logo" class="w-20 h-20 mr-2 inline-block"/>
        </div>
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
        <v-text-field
            v-model="password"
            label="Mot de passe"
            :rules="[textRule]"
            rounded-full
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            class="w-full mt-5 rounded-2xl"
            type="password"
            required
        />
        <loading-button label="Connexion" :is-loading="isLoading" @button-clicked="submitLogin"
        class="w-full"/>
        <div v-if="_errorMessage !== ''"
             class="text-center text-validation-error mx-4">
          <span class="text-lg">{{ _errorMessage }}</span> <br/>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script setup lang="js">

import {ref} from "vue";
import {textRule, emailRule} from "@/composables/rules";
import {setStorage} from "@/composables/storage";
import jwt_decode from "jwt-decode";
import LoadingButton from "../components/LoadingButton.vue";

const router = useRouter();
const {$authApi} = useNuxtApp()
const config = useRuntimeConfig()

const email = ref('');
const password = ref('');
const loginForm = ref(null);
const isLoading = ref(false);
const _errorMessage = ref('');

async function submitLogin() {
  const promise = loginForm.value.validate()
  promise.then(async (success) => {
    if (success.valid) {
      isLoading.value = true
      _errorMessage.value = ''
      await $authApi.login({username: email.value, password: password.value, app: config.public.applicationId})
          .then(response => {
            setStorage('token', response.data.token)
            const user = jwt_decode(response.data.token)
            setStorage('user', user);

            if(user.roles.includes('ROLE_SUPER_ADMIN')) {
              router.push('/admin/client')
            } else if(user.roles.includes('ROLE_CLIENT')) {
              router.push('/account')
            } else{
              _errorMessage.value = 'Email ou mot de passe incorrect'
            }

            return response
          }).catch(error => {
            const status = error.response.status
            switch(status) {
              case 404:
                _errorMessage.value = 'Email ou mot de passe incorrect'
                break
              default:
                _errorMessage.value = 'Une erreur est survenue'
            }
          }).finally(() => {
            isLoading.value = false
          })
    }
  })


}

</script>
