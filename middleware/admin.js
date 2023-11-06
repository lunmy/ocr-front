import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { user } = storeToRefs(useAuthStore());
        if (!user || user === '' || user === null || user === undefined || user.roles === undefined || user.roles === null || !user.roles.includes('ROLE_SUPER_ADMIN')) {
            //return navigateTo('/login')
        }
    return true;
})
