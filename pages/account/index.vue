<template>
  <div class="lg:grid grid-cols-12 gap-12">
    <h1 class="text-3xl col-span-10">Mes contrats</h1>
    <div class="col-span-2 flex justify-end">
      <v-btn
          class="!bg-primary-0 !text-white"
          @click="$router.push('/account/contract/new')"
      >
        <v-icon>mdi-plus</v-icon>
        <span class="ml-2">Ajouter un contrat</span>
      </v-btn>
    </div>
  </div>
  <v-data-table-server
      :headers="headers"
      :items="contracts"
      :items-length="totalPages"
      :expanded.sync="expanded"
      :page.sync="page"
      :loading="loading"
      @update:options="loadItems"

      item-value="@id"
      class="elevation-1"
      items-per-page-text=""
      items-per-page="20"
      :items-per-page-options="[ {value: 20, title: '20'}, {value: 10, title: '10'} ]"
      :pageText="'{0}-{1} / {2}'"
      loading-text="Loading... Please wait"
      @update:sortBy="sortByF"
      :sort-by.sync="orderBy"
  >
    <template #[`item.startDate`]="{ item }">
      {{ moment(item.selectable.startDate).format('DD/MM/YYYY') }}
    </template>
    <template #[`item.endDate`]="{ item }">
      {{ moment(item.selectable.endDate).format('DD/MM/YYYY') }}
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="flex justify-end">
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
            @click="update(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            class="mr-2"
            @click="deleteItem(item)"
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

definePageMeta({
  layout: 'client'
})


const page = ref(1)
const orderBy = ref([{key: 'startDate', order: 'ASC'}])
const customerSearch = ref('')
const totalPages = ref(0)
const expanded = ref([]);
const loading = ref(false);
const headers = ref([])
const contracts = ref([])
const timer = ref(null)
const dialogForDelete = ref(false)
const itemForDelete = ref({})

headers.value = [
  {title: 'Nom', key: 'name'},
  {title: 'Date de début', key: 'startDate'},
  {title: 'Date de fin', key: 'endDate'},
  {title: 'Actions', key: 'actions', sortable: false, align: 'end'},
];


async function loadItems({page, itemsPerPage, sortBy}) {
  loading.value = true
  const filters = {}
  filters.page = page
  filters.order = orderBy.value

  await $crmApi.getAllContracts(filters).then(
      (response) => {
        contracts.value = response['hydra:member']
        totalPages.value = response['hydra:totalItems']
      }
  ).catch((error) => {
    errorToast('Une erreur est survenue ' + error.response.data.detail)
    console.log(error.response.data.detail)
  })
  loading.value = false
}

function sortByF(key) {
  orderBy.value = key
}

function deleteItem(item) {
  itemForDelete.value = item.selectable
  dialogForDelete.value = true
}

function deleteIt(id) {
  $crmApi.deleteContract(id).then(
      (response) => {
        successToast('Contrat supprimé')
        dialogForDelete.value = false
        loadItems({})
      }
  ).catch((error) => {
    errorToast('Une erreur est survenue ' + error.response.data.detail)
    console.log(error.response.data.detail)
  })
}

function update(item) {
  router.push(`/account/contract/${getIdFromIri(item.selectable['@id'])}/edit`)
}

function details(item) {
  router.push(`/account/contract/${getIdFromIri(item.selectable['@id'])}/detail`)
}

</script>
