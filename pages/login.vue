<template>
  <v-form ref="loginForm" class="bg-white xl:w-1/2 w-full px-8">
    <div class="flex justify-center mb-10">
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
    <div class="text-center m-4">
      <nuxt-link to="/password/forgot">Mot de passe oublié ?</nuxt-link>
    </div>

  </v-form>
</template>
<script setup lang="js">

import {ref} from "vue";
import {textRule, emailRule} from "@/composables/rules";
import {setStorage} from "@/composables/storage";
import jwt_decode from "jwt-decode";
import LoadingButton from "../components/LoadingButton.vue";

import {storeToRefs} from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: 'login'
})

const router = useRouter();
const {$authApi} = useNuxtApp()
const config = useRuntimeConfig()
const { setToken, setUser } = useAuthStore(); // use authenticateUser action from  auth store


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
            setToken(response.data.token)
            const user = jwt_decode(response.data.token)
            setUser(user);

            if (user.roles.includes('ROLE_SUPER_ADMIN')) {
              router.push('/admin/client')
            } else if (user.roles.includes('ROLE_CLIENT')) {
              router.push('/account')
            } else {
              _errorMessage.value = 'Email ou mot de passe incorrect'
            }
            return response
          }).catch(error => {
            const status = error.response.status
            switch (status) {
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
