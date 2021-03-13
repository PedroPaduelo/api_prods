const connection = require('../../database/connection');
const GeoLocation = require('../../utils/GeoLocation');

module.exports = {

      async Creat(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');


          
            const ip = request.body.ip
            const res = await GeoLocation.ValidaLocations(ip)
 

            const devicer = request.body.devicer
            const data_acesso = request.body.data_acesso
            const hora_acesso = request.body.hora_acesso
            const id_prod = request.body.id_prod

            const provedor = res.as
            const country = res.country
            const countrycode = res.countryCode
            const lat = res.lat
            const lon = res.lon
            const regioncod = res.region
            const regionname = res.regionName
            const timezone = res.timezone

            
                        
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
