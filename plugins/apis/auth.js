export default ({axios, baseUrl}) => ({
    port(){
        return process.env.NODE_ENV === 'production' ? '' : ':444'
    },
    async login(credentials) {
        return await axios.post(`${baseUrl}${this.port()}/auth`, credentials)
    },
    async passwordToken(creds) {
        return await axios.post(`${baseUrl}${this.port()}/password/token`, creds)
    },
    async resetPassword(creds) {
        return await axios.post(`${baseUrl}${this.port()}/password/reset`, creds)
    },
})
