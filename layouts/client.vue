<template>
  <v-app>
    <v-app-bar
        :elevation="2"
        class="!bg-primary-0 !text-white !overflow-visible"
    >
      <v-app-bar-nav-icon variant="text" icon="mdi-home" @click.stop="$router.push('/account/contract/new')"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div
          v-if="user !== null && user !== undefined"
          class="relative px-6"
      >
        <div
            id="menu-activator"
            class="bg-secondary-0 flex items-center justify-center w-10 h-10 rounded-full mx-2 cursor-pointer"
        >
          {{ userInitials() }}
        </div>
        <v-menu activator="#menu-activator">
          <v-list>
            <v-list-item @click="logout" title="Déconnexion" class="border-b border-gray-200 py-4">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout"></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <div class="p-10">
          <NuxtPage/>
      </div>
    </v-main>
  </v-app>
</template>
<script setup>
import { useAuthStore } from '~/store/auth';
import vClickOutside from 'v-click-outside'

const router = useRouter();
const drawer = ref(false);
const menuOpened = ref(false);
const dropdown = ref(null);
const { user } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore();


defineComponent({
  directives: {
    clickOutside: vClickOutside.directive,
  },
});

applyStyle(router.currentRoute.value.fullPath);

function applyStyle(url) {

  if (router.currentRoute.value.fullPath === url) {
    return 'bg-primary-900';
  }
}

function userInitials() {
  if (user.value === null || user.value === undefined) {
    return '';
  }
  return user.value.firstname.split(' ')[0][0] + user.value.lastname.split(' ')[0][0];
}

function externalClick(event) {
  menuOpened.value = false
}

onMounted(async () => {
  userInitials();
});

const onClickOutside = (event) => {
  menuOpened.value = false
};

function logout() {
  logUserOut();
  router.push('/login');
}

</script>
