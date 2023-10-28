<template>
  <button
      @click.prevent="validate"
      :disabled="_isLoading"
      class="block bg-secondary-0  py-2 rounded-lg text-white font-semibold text-center">
    <span v-if="!isLoading" class="block w-full text-center">{{ _label}}</span>
    <v-progress-circular v-else indeterminate size="20"></v-progress-circular>
  </button>
</template>
<script setup>
import {ref} from "vue";

const _isLoading = ref(false);
const _label = ref('');
const emit = defineEmits(['button-clicked'])

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: false
  },
  label: {
    type: String,
    required: false,
    default: 'VALIDER'
  }
})
onMounted(() => {
  _isLoading.value = props.isLoading;
  _label.value = props.label;
})

function validate() {
  emit('button-clicked');
}
</script>
