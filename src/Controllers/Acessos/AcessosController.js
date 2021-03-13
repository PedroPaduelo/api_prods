const connection = require('../../database/connection');


module.exports = {

      async Creat(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const devicer = request.body.devicer
            const provedor = request.body.provedor
            const country = request.body.country
            const countryCode = request.body.countryCode
            const lat = request.body.lat
            const lon = request.body.lon
            const ip = request.body.ip
            const regionCod = request.body.regionCod
            const regionName = request.body.regionName
            const timezone = request.body.timezone
            const data_acesso = request.body.data_acesso
            const hora_acesso = request.body.hora_acesso
            const id_prod = request.body.id_prod
                        
            try {
                  const id = await connection('tbl_acessos').insert({
                        devicer,
                        provedor,
                        country,
                        countryCode,
                        lat,
                        lon,
                        ip,
                        regionCod,
                        regionName,
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
