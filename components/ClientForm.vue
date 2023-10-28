<template>
  <v-form ref="clientForm">
    <div class="lg:grid grid-cols-2 gap-5"
         v-if="_client !== null && _client !== undefined && _client.address !== null && _client.address !== undefined">
      <v-select
          v-model="_client.gender"
          :items="_genders"
          density="compact"
          variant="outlined"
          label="Civilité"
          item-title="label"
          item-value="key"
      ></v-select>
      <v-text-field
          v-model="_client.firstname"
          :rules="[textRule]"
          label="Prénom"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <v-text-field
          v-model="_client.lastname"
          :rules="[textRule]"
          label="Nom"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <v-text-field
          v-model="_client.email"
          :rules="[textRule, emailRule]"
          label="Email"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <v-text-field
          v-model="_client.phone"
          :rules="[textRule]"
          label="Téléphone"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <h2 class="text-2xl col-span-2">Adresse</h2>
      <v-text-field
          v-model="_client.address.street"
          :rules="[textRule]"
          label="N° et voie"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <v-text-field
          v-model="_client.address.complement"
          label="Complément d'adresse"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <v-text-field
          v-model="_client.address.zipcode"
          :rules="[textRule]"
          label="Code postal"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <v-text-field
          v-model="_client.address.city"
          :rules="[textRule]"
          label="Ville"
          clear-icon="mdi-close-circle"
          variant="outlined"
          dense
      ></v-text-field>
      <div class="col-span-2 flex justify-start">
        <loading-button :is-loading="isLoading" @button-clicked="submit" class="w-64 mb-2 mt-4 "/>
        <v-btn @click="$router.go(-1)" class="w-64 ml-6 mb-2 mt-4 ">Annuler</v-btn>
        <div v-if="_errorMessage !== ''"
             class="text-center text-validation-error mx-4">
          <span class="text-lg">{{ _errorMessage }}</span> <br/>
        </div>
      </div>
    </div>
  </v-form>
</template>
<script setup>
import {ref} from "vue";
import ClientForm from "@/components/LoadingButton";
import {textRule, emailRule} from "@/composables/rules";
import LoadingButton from "./LoadingButton.vue";

const _errorMessage = ref("");
const clientForm = ref(null);
const emit = defineEmits(['validated'])

const _client = ref({})
const _isLoading = ref(false)
const _genders = ref([{key: 'MR', label: 'Monsieur'}, {key: 'MRS', label: 'Madame'}])


const props = defineProps({
  client: {
    type: Object,
    required: true,
    default: () => null
  },
  isLoading: {
    type: Boolean,
    required: true,
    default: false
  }
})
onMounted(() => {
  _client.value = props.client
  _isLoading.value = props.isLoading
})

function submit() {
  const promise = clientForm.value.validate()
  promise.then((success) => {
    if (success.valid) {
      emit('validated', {
        client: _client.value
      });
    }
  })
}

</script>
