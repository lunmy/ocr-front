<template>
  <h1 class="text-3xl">Contrats</h1>

  <v-text-field
      class="my-5"
      placeholder="Rechercher un contrat"
      prepend-inner-icon="mdi-search"
      clear-icon="mdi-close-circle"
      filled
      dense
      hide-details
      ma-0
  ></v-text-field>

  <v-data-table
      :headers="headers"
      :items="contracts"
      item-value="name"
      class="elevation-1"
      items-per-page="20"
      :pageText="'{0}-{1} de {2}'"
  >
    <template v-slot:item.client="{ columns, item }">
      {{ item.selectable.client.name }}
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="details(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
          small
          class="mr-2"
          @click="updateClient(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          class="mr-2"
          @click="deleteClient(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script setup>

import { VDataTable } from 'vuetify/labs/VDataTable'

definePageMeta({
  //middleware: 'auth',
  layout: 'admin'
})

const expanded = ref([]);
const singleExpand = ref(false);

const headers=ref([])
headers.value = [
  {
    title: 'Contrat',
    key: 'name'
  },
  {
    title: 'Client',
    key: 'client'
  },
  {
    title: 'Date de début',
    key: 'fromDate'
  },
  {
    title: 'Date de fin',
    key: 'toDate'
  },
  {
    title: 'Actions',
    key: 'actions',
  }
];

const contracts = ref([])
contracts.value = []
for(let i = 0; i < 100; i++) {
  contracts.value.push({
    id: i + 1,
    name: 'Contrat ' + (i + 1),
    client: {
      name: 'Client ' + (i + 1),
      address: '36 Rue de la Liberté 75000 Paris',
      phone: '01 23 45 67 89',
      email: 'cZ0lT@example.com',
    },
    fromDate: '01/01/2023',
    toDate: '01/01/2024',
    status: 'En cours'
  })
}
</script>
