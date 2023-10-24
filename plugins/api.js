import crmApi from '@/plugins/apis/crm'
import authApi from '@/plugins/apis/auth'
import axios from "axios";
import {getStorage} from "@/composables/storage";

export default defineNuxtPlugin((NuxtApp) =>{
    const config = useRuntimeConfig()
    let apiCrm = axios.create({
        baseUrl: config.public.apiCrmUrl,
    });

    apiCrm.interceptors.request.use((config) => {
        const nuxtConfig = useRuntimeConfig()
        const token = getStorage('token');
        if(token !== undefined && token !== null && token !== '') {
            config.headers['Authorization'] = `Bearer ${token}`
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
