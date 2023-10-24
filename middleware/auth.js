import {getStorage} from "@/composables/storage";
import moment from 'moment'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = getStorage('token')
    const user = getStorage('user')

    const router = useRouter();
    if (
        !token || token === '' || token === null || token === undefined ||
        !user || user === '' || user === null || user === undefined
    ) {
        return router.push('/login')
    }
    var day = moment.unix(user.exp);
    if (day < moment()) {
        return router.push('/login')
    }
})
