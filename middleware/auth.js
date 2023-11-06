import moment from 'moment'
import {storeToRefs} from "pinia";
import {useAuthStore} from '~/store/auth';
import {navigateTo} from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from, $pinia) => {

    const {token, user} = storeToRefs(useAuthStore()); // make authenticated state reactive
    const router = useRouter();
    if (
        !token || token === '' || token === null || token === undefined ||
        !user || user === '' || user === null || user === undefined
    ) {
         return navigateTo('/login')
    }

    var day = moment.unix(user.exp);
    if (day < moment()) {
        return navigateTo('/login')
    }
    return true;

})
