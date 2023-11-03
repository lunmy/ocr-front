export default ({axios, baseUrl}) => ({
    async login(credentials) {
        return await axios.post(`${baseUrl}/auth`, credentials)
    },
    async passwordToken(creds) {
        return await axios.post(`${baseUrl}/password/token`, creds)
    },
    async resetPassword(creds) {
        return await axios.post(`${baseUrl}/password/reset`, creds)
    },
})
