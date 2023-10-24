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
    ></v-select>
    <v-text-field
        v-model="_client.firstname"
        :rules="[textRule]"
        label="Prénom"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <v-text-field
        v-model="_client.lastname"
        :rules="[textRule]"
        label="Nom"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <v-text-field
        v-model="_client.email"
        :rules="[textRule, emailRule]"
        label="Email"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <v-text-field
        v-model="_client.phone"
        :rules="[textRule]"
        label="Téléphone"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <h2 class="text-2xl col-span-2">Adresse</h2>
    <v-text-field
        v-model="_client.address.street"
        :rules="[textRule]"
        label="N° et voie"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <v-text-field
        v-model="_client.address.complement"
        label="Complément d'adresse"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <v-text-field
        v-model="_client.address.zipcode"
        :rules="[textRule]"
        label="Email"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <v-text-field
        v-model="_client.address.city"
        :rules="[textRule]"
        label="Téléphone"
        prepend-inner-icon="mdi-search"
        clear-icon="mdi-close-circle"
        variant="outlined"
        dense
    ></v-text-field>
    <div class="col-span-2">
      <button
          @click.prevent="submit()"
          class="block w-full lg:w-1/4 mx-auto bg-secondary-0 mt-4 py-2 rounded-lg text-white font-semibold mb-2">
        Valider
      </button>
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
import {textRule, emailRule} from "@/composables/rules";

const _errorMessage = ref("");
const clientForm = ref(null);
const emit = defineEmits(['validated'])

const _client = ref({})
const _genders = ref(['MR', 'MRS', 'MS'])


const props = defineProps({
  client: {
    type: Object,
    required: true,
    default: () => null
  }
})
onMounted(() => {
  _client.value = props.client
  console.log('aa', props.client.value)
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
