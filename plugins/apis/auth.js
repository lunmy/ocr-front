export default ({axios, baseUrl}) => ({
    async login(credentials) {
        return await axios.post(`${baseUrl}:444/auth`, credentials)
    },
    async passwordToken(creds) {
        return await axios.post(`${baseUrl}:444/password/token`, creds)
    },
    async resetPassword(creds) {
        return await axios.post(`${baseUrl}:444/password/reset`, creds)
    },
})
