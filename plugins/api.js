import crmApi from '@/plugins/apis/crm'
import authApi from '@/plugins/apis/auth'
import axios from "axios";
import { useAuthStore } from '~/store/auth';


export default defineNuxtPlugin((NuxtApp) =>{
    const config = useRuntimeConfig()


    let apiCrm = axios.create({
        baseUrl: config.public.apiCrmUrl,
    });

    apiCrm.interceptors.request.use((config) => {

        const { token } = storeToRefs(useAuthStore());
        if(token.value !== undefined && token.value !== null && token.value !== '') {
            config.headers['Authorization'] = `Bearer ${token.value}`
        }
        return config
    })

    let apiAuth = axios.create({
        baseUrl: config.public.apiAuthUrl,
    });


    return {
        provide: {
            crmApi: crmApi({axios: apiCrm, baseUrl: config.public.apiCrmUrl}),
            authApi: authApi({axios: apiAuth, baseUrl: config.public.apiAuthUrl}),
        }
    }
})
