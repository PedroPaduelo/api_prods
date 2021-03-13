const axios = require('axios');

module.exports = {
    async ValidaLocations(ip){
        try {
            const res = await axios.get(`http://ip-api.com/json/${ip}`)
            const result = res.data
            return result
        } catch (error) {
            return 'Erro de validação loactions'   
        }
    }
}