const connection = require('../../database/connection');
const axios = require('axios');

let url = `http://ip-api.com/json/`

module.exports = {

      async Creat(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');


          
            const ipv4 = request.body.ipv4
            const res = await axios.get(`http://ip-api.com/json/${ipv4}`)
 
            console.log(res.data)



            const devicer = request.body.devicer
            const ip = request.body.ip
            const data_acesso = request.body.data_acesso
            const hora_acesso = request.body.hora_acesso
            const id_prod = request.body.id_prod
            

            const provedor = res.data.provedor
            const country = res.data.country
            const countrycode = res.data.countrycode
            const lat = res.data.lat
            const lon = res.data.lon
            const regioncod = res.data.regioncod
            const regionname = res.data.regionname
            const timezone = res.data.timezone

            
                        
            try {
                  const id = await connection('tbl_acessos').insert({
                        devicer,
                        provedor,
                        country,
                        countrycode,
                        lat,
                        lon,
                        ip,
                        regioncod,
                        regionname,
                        timezone,
                        data_acesso,
                        hora_acesso,
                        id_prod
                  }, ['id'])

                  return response.json(id[0]);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
            }
      },

      async List(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const email = request.params.email
            console.log(email)

            try {
                  const listaDeCampanha = await connection.select("*")
                              .from('tbl_acessos')
                              .where("email_user", email)
                  return response.json(listaDeCampanha);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
            }
      },

      async ListId(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');
            console.log("Id list")
            const id = request.params.id
            console.log(id)
            try {
                  const listaDeCampanha = await connection.select("*")
                              .from('tbl_acessos')
                              .where("id", id)
                              .first()

                  return response.json(listaDeCampanha);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
                  
            }
      },

      async CountProdUser(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const email = request.params.email

            try {
                  const countProd = await connection.count("*")
                              .from('tbl_acessos')
                              .where("email_user", email)
                              .first()

                  return response.json(countProd);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
            }
      },

}
