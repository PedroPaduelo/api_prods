const connection = require('../../database/connection');


module.exports = {


    
      async Creat(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const produtcname = request.body.produtcname
            const produtcfile = request.body.produtcfile
            const produtcdescription = request.body.produtcdescription
            const pixelfacebook = request.body.pixelfacebook
            const statusprodutc = request.body.statusprodutc
            const linkbuy = request.body.linkbuy
            const price = request.body.price
            const linkpage = request.body.linkpage
            const email_user = request.body.email_user
            

            const linkpageinicio = "http://nommand.com.br/"

            
            try {
                  const id = await connection('tbl_produtos').insert({
                        produtcname,
                        produtcfile,
                        produtcdescription,
                        pixelfacebook,
                        statusprodutc,
                        linkbuy,
                        linkbuy,
                        price,
                        linkpage,
                        email_user
                  }, ['linkpage'])

                  return response.json(id[0]);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
            }
      },

      async List(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');
            console.log("List Geral")
            try {
                  const listaDeCampanha = await connection.select("*")
                              .from('tbl_produtos')
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
                              .from('tbl_produtos')
                              .where("id", id)
                              .first()

                  return response.json(listaDeCampanha);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
                  
            }
      },

      async Update(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const id = request.body.id
            const produtcname = request.body.produtcname
            const produtcfile = request.body.produtcfile
            const produtcdescription = request.body.produtcdescription
            const pixelfacebook = request.body.pixelfacebook
            const statusprodutc = request.body.statusprodutc
            const linkbuy = request.body.linkbuy
            const price = request.body.price
            const linkpage = request.body.linkpage
            const email_user = request.body.email_user

            try {
                  const result = await connection('tbl_produtos').where('id', id).update({
                        produtcname,
                        produtcfile,
                        produtcdescription,
                        pixelfacebook,
                        statusprodutc,
                        linkbuy,
                        linkbuy,
                        price,
                        linkpage,
                        email_user});     
                  
                  
                  return response.json(true);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
            }
      },

      async Delete(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const id = request.params.id

            try {
                  await connection.delete("*")
                              .from('tbl_produtos')
                              .where("id", id)
                  return response.json(true);
            } catch (error) {
                  console.log(error)
                  return response.json(false); 
            }
      },

}
