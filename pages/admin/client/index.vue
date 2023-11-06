<template>
  <div class="lg:grid grid-cols-12 gap-12">
    <h1 class="text-3xl col-span-10">Clients</h1>
    <div class="col-span-2">
      <v-btn
          class="!bg-primary-0 !text-white"
          @click="$router.push('/admin/client/new')"
      >
        <v-icon>mdi-plus</v-icon>
        <span class="ml-2">Ajouter un client</span>
      </v-btn>
    </div>
  </div>
  <v-text-field
      v-model="customerSearch"
      class="my-5"
      placeholder="Rechercher un client"
      prepend-inner-icon="mdi-search"
      clear-icon="mdi-close-circle"
      variant="outlined"
      dense
      hide-details
  ></v-text-field>
  <v-data-table-server
      :headers="headers"
      :items="clients"
      :items-length="totalPages"
      :expanded.sync="expanded"
      :page.sync="page"
      v-model:expanded="expanded"
      :loading="loading"
      @update:options="loadItems"

      item-value="@id"
      class="elevation-1"
      items-per-page-text="Clients par page"
      items-per-page="20"
      :items-per-page-options="[ {value: 20, title: '20'}, {value: 10, title: '10'} ]"
      :pageText="'{0}-{1} / {2}'"
      loading-text="Loading... Please wait"
      show-expand
      single-expand
      select-strategy="single"
      density="compact"
      @update:sortBy="sortByF"
      :sort-by.sync="orderBy"
  > <template v-slot:item.data-table-expand="{ columns, item }">
  </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <v-list>
            <v-list-item v-for="(itm, index) in item.contracts" :key="index">
              <v-list-item-content>
                <v-list-item-title>Contrat</v-list-item-title>
                <v-list-item-subtitle>
                  Du {{ formatDate(itm.startDate) }}
                  au {{ formatDate(itm.endDate) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </td>
      </tr>
    </template>
    <template #[`item.firstname`]="{ item }">
      {{ item.user.firstname }}
    </template>
    <template #[`item.lastname`]="{ item }">
      {{ item.user.lastname }}
    </template>
    <template #[`item.email`]="{ item }">
      {{ item.user.email }}
    </template>
    <template #[`item.phone`]="{ item }">
      {{ item.user.phone }}
    </template>
    <template #[`item.contracts`]="{ item }">
      {{ item.contracts.length }}
    </template>
    <template #[`item.address`]="{ item }">
      {{ item.user.address.street }}
      {{ item.user.address.complement }}
      {{ item.user.address.zipcode }}
      {{ item.user.address.city }}
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="flex justify-end">
        <v-icon
            v-if="item.contracts.length > 0"
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
      </div>
    </template>
  </v-data-table-server>

  <v-dialog v-model="dialogForDelete" max-width="600">
    <v-card>
      <v-card-title class="text-h5"> Suppression</v-card-title>
      <v-card-text>
        Etes-vous sûr de vouloir supprimer cet élément ? <br/><br/>
        <strong>{{ itemForDelete.firstname }} {{ itemForDelete.lastname }}</strong>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="dialogForDelete = false"
        >
          NON
        </v-btn>
        <v-btn
            :loading="loading"
            color="red darken-1"
            text
            @click="deleteIt(itemForDelete['@id'])"
        >
          OUI
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
<script setup>

import {VDataTableServer} from 'vuetify/labs/VDataTable'
import {errorToast, successToast} from "@/composables/toast";
import {getIdFromIri} from "@/composables/utils";
import moment from 'moment'

const router = useRouter();
const {$crmApi} = useNuxtApp()

const page = ref(1)
const orderBy = ref([{key: 'lastname', order: 'ASC'}])
const customerSearch = ref('')
const totalPages = ref(0)
const expanded = ref([]);
const loading = ref(false);
const headers = ref([])
const clients = ref([])
const timer = ref(null)
const dialogForDelete = ref(false)
const itemForDelete = ref({})

headers.value = [
  {title: 'Nom', key: 'user.lastname'},
  {title: 'Prénom', key: 'user.firstname'},
  {title: 'Email', key: 'user.email'},
  {title: 'Adresse', key: 'address', sortable: false},
  {title: 'Tel', key: 'user.phone',},
  {title: 'Contrats', key: 'contracts', sortable: false},
  {title: 'Actions', key: 'actions', sortable: false, align: 'end'},
];

async function loadItems({page, itemsPerPage, sortBy}) {
  loading.value = true
  const filters = {}
  filters.page = page
  filters.order = orderBy.value
  if (customerSearch.value) {
    filters.customerSearch = customerSearch.value
  }
  await $crmApi.getAllCustomers(filters).then(
      (response) => {
        clients.value = response['hydra:member']
        totalPages.value = response['hydra:totalItems']
      }
  ).catch((error) => {
    errorToast('Une erreur est survenue ' + error.response.data.detail)
    console.log(error.response.data.detail)
  })
  loading.value = false
}

function formatDate(date) {
  return moment(date).format("DD/MM/YYYY");
}

watch(customerSearch, (newValue, oldValue) => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    loadItems({page: 1, itemsPerPage: 20, sortBy: {key: 'user.lastname', value: 'ASC'}})
  }, 1000)
}, {deep: true});


function sortByF(key) {
  orderBy.value = key
}

function details(item) {

  const itemIndex = expanded.value.indexOf(item['@id']);

  if (itemIndex === -1) {
    expanded.value.push(item['@id']);
  } else {
    expanded.value.splice(itemIndex, 1);
  }
}

function updateClient(item) {
  router.push(`/admin/client/${getIdFromIri(item['@id'])}/edit`)
}

function deleteClient(item) {
  itemForDelete.value = item
  dialogForDelete.value = true
}

function deleteIt(id) {
  $crmApi.deleteCustomer(id).then(
      (response) => {
        successToast('Client supprimé')
        dialogForDelete.value = false
        loadItems({})
      }
  ).catch((error) => {
    errorToast('Une erreur est survenue ' + error.response.data.detail)
    console.log(error.response.data.detail)
  })
}
</script>
