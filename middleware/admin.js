import {getStorage} from "@/composables/storage";
import moment from "moment/moment";


export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = getStorage('user')
    const router = useRouter();

    if(!user || user === '' || user === null || user === undefined || user.roles === undefined || user.roles === null || !user.roles.includes('ROLE_SUPER_ADMIN')) {
        //router.push('/login')
        return false;
    }

    return true;
})
