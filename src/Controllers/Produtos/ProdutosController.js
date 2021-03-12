const connection = require('../../database/connection');


module.exports = {

      async Creat(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const produtcname = request.body.produtcname
            const poductsubhead = request.body.poductsubhead
            const whatsvendedor = request.body.whatsvendedor

            const img1 = request.body.img1
            const img2 = request.body.img2
            const img3 = request.body.img3

            const produtcdescription1 = request.body.produtcdescription1
            const produtcdescription2 = request.body.produtcdescription2
            const produtcdescription3 = request.body.produtcdescription3
            const pixelfacebook = request.body.pixelfacebook
            const statusprodutc = request.body.statusprodutc
            const linkbuy = request.body.linkbuy
            const price = request.body.price
            const linkpage = request.body.linkpage
            const email_user = request.body.email_user
                        
            try {
                  const id = await connection('tbl_produtos').insert({
                        produtcname,
                        poductsubhead,
                        whatsvendedor,
                        img1,
                        img2,
                        img3,
                        produtcdescription1,
                        produtcdescription2,
                        produtcdescription3,
                        pixelfacebook,
                        statusprodutc,
                        linkbuy,
                        linkbuy,
                        price,
                        linkpage,
                        email_user
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
                              .from('tbl_produtos')
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
            const poductsubhead = request.body.poductsubhead
            const whatsvendedor = request.body.whatsvendedor

            const img1 = request.body.img1
            const img2 = request.body.img2
            const img3 = request.body.img3

            const produtcdescription1 = request.body.produtcdescription1
            const produtcdescription2 = request.body.produtcdescription2
            const produtcdescription3 = request.body.produtcdescription3
            const pixelfacebook = request.body.pixelfacebook
            const statusprodutc = request.body.statusprodutc
            const linkbuy = request.body.linkbuy
            const price = request.body.price
            const linkpage = request.body.linkpage
            const email_user = request.body.email_user

            try {
                  const result = await connection('tbl_produtos').where('id', id).update({
                        produtcname,
                        poductsubhead,
                        whatsvendedor,
                        img1,
                        img2,
                        img3,
                        produtcdescription1,
                        produtcdescription2,
                        produtcdescription3,
                        pixelfacebook,
                        statusprodutc,
                        linkbuy,
                        linkbuy,
                        price,
                        linkpage,
                        email_user
                  });     
                  
                  
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

      async CountProdUser(request, response){

            // const { authorization } = request.headers;
            // const [, token] = authorization.split(' ');

            const email = request.params.email

            try {
                  const countProd = await connection.count("*")
                              .from('tbl_produtos')
                              .where("email_user", email)
                              .first()

                  console.log(countProd)

                  return response.json(countProd);

            } catch (error) {
                  console.log(error)
                  return response.json(false); 
            }
      },



}
