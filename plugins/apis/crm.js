import {setStorage, getStorage} from "@/composables/storage";

export default ({axios, baseUrl}) => ({
    async getAllCustomers(options) {
        let filters = options
        //filters.allObjects = true

        if (filters.customerSearch === '') {
            delete filters.customerSearch
        }

        if (filters.groups === undefined) {
            filters.groups = []
        }

        if(filters.order !== undefined) {
            let order  = {};
            filters.order.forEach((item) => {
                order[item.key] = item.order.toLowerCase();
            })
            filters.order = order
        }

        filters.groups.push('address:read')
        filters.groups.push('contract:read')

        return await this.getAll('customers', filters)
    },
    async createCustomer(quiz) {
        return await this.create('customers', quiz, {groups: ['customer:read','address:read']})
    },

   async deleteCustomer(id) {
       return await this.delete(id)
   },
    async getAll(ep, filters) {
        let page = filters === null || filters.page === undefined ? 1 : filters.page
        const datas = []
        let hasNextPage = true

        do {
            const request = await axios.get(`${baseUrl}/${ep}`, {
                params: {
                    ...filters,
                    page,
                },
            })

            if (request.status === 200) {
                if (filters === null) return request.data['hydra:member']
                else if (filters.allObjects) datas.push(...request.data['hydra:member'])
                else return request.data
            }

            if (!request.data['hydra:view']['hydra:next']) {
                hasNextPage = false
            }
            page++
        } while (hasNextPage)
        return datas
    },
    async getOne(ep, id, params = null) {
        const request = await axios.get(`${baseUrl}/${ep}/${id}`, {
            headers: {
                'Content-Type': 'application/ld+json',
            },
            params: {
                ...params,
            },
        })
        if (request.status === 200) {
            return request.data
        }
        return []
    },
    async create(ep, data, params = null) {
        const request = await axios.post(`${baseUrl}/${ep}`, data, {
            headers: {
                'Content-Type': 'application/ld+json',
            },
            params: {
                ...params,
            },
        })
        if (request.status === 201) {
            return request.data
        }
    },
    async update(data, params = null) {
        return await axios.put(`${baseUrl}${data['@id']}`, data, {
            headers: {
                'Content-Type': 'application/ld+json',
            },
            params: {
                ...params,
            },
        })
    },
    async delete(id) {
        const request = await axios.delete(`${baseUrl}${id}`, {
            headers: {
                'Content-Type': 'application/ld+json',
            },
        })
        return request.status === 204
    },
})
