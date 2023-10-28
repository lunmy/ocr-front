import {setStorage, getStorage} from "@/composables/storage";

export default ({axios, baseUrl}) => ({

   /****************************************************************************
   * Customers
   *****************************************************************************/
    async getAllCustomers(options) {
        let filters = options
        if (filters.customerSearch === '') {
            delete filters.customerSearch
        }

        if (filters.groups === undefined) {
            filters.groups = []
        }

        filters.groups.push('user:read')
        filters.groups.push('address:read')
        filters.groups.push('contract:read')

        return await this.getAll('customers', filters)
    },
    async getCustomer(id) {
        const filters = {}
        filters.groups = ['user:read', 'address:read', 'contract:read']
        return await this.getOne('customers', id, filters)
    },
    async createCustomer(customer) {
        if (customer.user.username === undefined) {
            customer.user.username = customer.user.email
        }
        return await this.create('customers', customer, {groups: ['user:read', 'customer:read', 'address:read']})
    },
    async updateCustomer(customer) {
        return await this.update(customer, {groups: ['user:read', 'address:read', 'contract:read']})
    },
    async deleteCustomer(id) {
        return await this.delete(id)
    },
    /****************************************************************************
     * Contract
     *****************************************************************************/
    async getAllContracts(options) {
        let filters = options

        if (filters.groups === undefined) {
            filters.groups = []
        }

        filters.groups.push('customer:read')
        return await this.getAll('contracts', filters)
    },
    async getContract(id) {
    const filters = {}
    filters.groups = ['customer:read', 'media:read']
    return await this.getOne('contracts', id, filters)
    },
    async createContract(contract) {
        const request = await axios.post(`${baseUrl}/contracts/new`, contract, {
            headers: {
                'Content-Type': 'multipart/form-data;',
            },
        })
        if (request.status === 201) {
            return request.data
        }
    },
    async updateContract(contract) {
        return await this.update(contract, {groups: ['customer:read', 'media:read']})
    },
    async deleteContract(id) {
        return await this.delete(id)
    },
    /****************************************************************************
     * General
    *****************************************************************************/
    async getAll(ep, filters) {
        let page = filters === null || filters.page === undefined ? 1 : filters.page
        const datas = []
        let hasNextPage = true

        if (filters.order !== undefined) {
            let order = {};
            filters.order.forEach((item) => {
                order[item.key] = item.order.toLowerCase();
            })
            filters.order = order
        }
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
