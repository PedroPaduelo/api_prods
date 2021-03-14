const connection = require('../../database/connection');
const axios = require('axios');
const Gmail = require('../../utils/ValidaGmail');

// variaveis staticas
const id_status = 1
const id_tipouser = 1
const id_org = 1

// Mensagem de retorno
let retorno = {}
retorno.mensagem = ""
retorno.status = ""


module.exports = {
      async CreateUser(request, response){
      
            // Variaveis de Criação
            const created_at = new Date()
            const updated_at = new Date()
            
            // Token de Acesso do G-mail enviado via body post
            const token = request.body.tokenId 

            // Busca dados do usuario
            const res = await Gmail.ValidaGmail(token)

            // Valida se o usuario foi retornado pelo end poit
            if(!res){
                 return response.json(false);
            }

            // Dados enviados
            const fistname = res.given_name || ''
            const lastname = res.family_name || ''
            const photoprofile = res.picture || ''
            const email = res.email.toLowerCase()  || ''

            // Busca email para validar se o user ja ta na base
            const user = await connection('tbl_user').where('email', email).first();

            // Chek de se o user ja foi criado
            if(!user){
                  try {
                        await connection('tbl_user').insert({
                              fistname,
                              lastname,
                              email,
                              photoprofile,
                              id_status,
                              id_tipouser,
                              id_org,
                              token,
                              capacidade: 10, 
                              created_at,
                              updated_at
                        })

                        // Busca User cadastrado para retornar os dados
                        const user = await connection('view_users').where('email', email).first();

                        // Vaila se o user retorno
                        if(user){

                              retorno.user = user
                              retorno.mensagem = "Usuário cadastrado com sucesso"
                              retorno.status = "success"

                              return response.json(retorno);
                        }

                        retorno.mensagem = "Erro na hora de cadastrar o usuario!!! Contate o Adiministrador"
                        retorno.status = "erro"

                        return response.json(retorno);
                        

                  } catch (error) {
                        console.error(error);

                        retorno.mensagem = "Erro na hora de cadastrar o usuario!!! Contate o Adiministrador"
                        retorno.status = "erro"

                        return response.json(retorno);
                  }
            }


            retorno.mensagem = "Usuario já cadastrado"
            retorno.status = "info"
            return response.json(retorno);
      },

      async GetUserToken(request, response){

            const { authorization } = request.headers;
            const [, token] = authorization.split(' ');

            const res = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?idtoken=${token}`)

            if(!res){
                  return response.json(false);
            }

            if(res){
                  const user = await connection('view_users').where('token', token).first();

                  retorno.user = user
                  retorno.mensagem = "Usuário Logado com sucesso"
                  retorno.status = "success"

                  return response.json(retorno)
                  
            }else{
                  return response.json(false);
            }
      },

      async LoginUser(request, response){


            // Token de Acesso do G-mail enviado via body post
            const token = request.body.tokenId 

            
            
            // Busca dados do usuario
            const res = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
            
            // Vaila se o user retorno
            if(res){
                  const email = res.data.email.toLowerCase()  || ''
                  console.log(email)

                  // Busca User cadastrado para retornar os dados
                  const user = await connection('view_users').where('email', email).first();

                  // atualiza o user 
                  if(user){
                        const result = await connection('tbl_user').where('email', email).update({token: token });
                        if(result){
                              retorno.user = user
                              retorno.mensagem = "Usuario logado com sucesso"
                              retorno.status = "success"
                              return response.json(retorno)
                        }else{
                              retorno.mensagem = "Erro ao logar usuario etapa up token"
                              retorno.status = "error"
                              return response.json(retorno)
                        }
                  }else{
                        retorno.mensagem = "Erro ao logar usuario etapa busta user!!!"
                        retorno.status = "warning"
                        return response.json(retorno)
                     
                  }
            }
            retorno.mensagem = "Erro no token do gmail!!!"
            retorno.status = "error"
            return response.json(retorno)        
      },

      async ListFilasUser(request, response){

            const email = request.params.email

            const filas = await connection.select("id")
                              .from('view_user_fila')
                              .where('email',email);
            return response.json(filas);
      },
}






