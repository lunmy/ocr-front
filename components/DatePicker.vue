<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
          class="!cursor-pointer"
          :label="_label"
          :model-value="formattedDate()"
          readonly="readonly"
          v-bind="props"
          variant="outlined"
          hide-details
      ></v-text-field>
    </template>
    <v-date-picker v-model="_date" hide-actions show-adjacent-months title="">
      <template v-slot:header></template>
    </v-date-picker>
  </v-menu>
</template>

<script setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { useLocale } from 'vuetify'
const { current } = useLocale()
current.value = 'fr'

import moment from 'moment'
const emit = defineEmits("update:date");
const props = defineProps({
  date: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: 'VALIDER'
  }
})

const isMenuOpen = ref(false)
const _date = ref(null)
const _label = ref('')

onMounted(() => {
  // transform props.date from string to new date
   _date.value = new Date(props.date)
  _label.value = props.label;
})

function formattedDate(){
  return _date.value?.toLocaleDateString('fr') ?? ''
}

watch(_date, () => {
  isMenuOpen.value = false
  emit("updateDate", _date.value);
})
</script>
