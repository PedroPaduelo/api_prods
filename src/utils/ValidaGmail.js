const axios = require('axios');

module.exports = {
    async ValidaGmail(token){
        try {
            const res = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
            const user = res.data
            return user
        } catch (error) {
            return 'Erro de tokem G-mail!!!'   
        }
    }
}