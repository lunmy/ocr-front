export default ({axios, baseUrl}) => ({
    async login(credentials) {
        return await axios.post(`${baseUrl}:444/auth`, credentials)
    },
})
