const express = require('express');
const authMiddleware = require('./Middleware/auth');



const UserController = require('./Controllers/User/UserController')
const ProdutosController = require('./Controllers/Produtos/ProdutosController')
const AcessosController = require('./Controllers/Acessos/AcessosController')

const routes = express.Router();


routes.post('/LoginUser', UserController.LoginUser );
routes.post('/CreateUser', UserController.CreateUser );
routes.get('/GetUserToken', UserController.GetUserToken );
routes.get('/ListFilasUser/:email', UserController.ListFilasUser );

routes.post('/CreatProdutos', ProdutosController.Creat );
routes.get('/ListProdutos/:email', ProdutosController.List );
routes.get('/ListProdutosById/:id', ProdutosController.ListId );
routes.put('/UpdateProdutos', ProdutosController.Update );
routes.delete('/DeleteProdutos/:id', ProdutosController.Delete );
routes.get('/CountProdUser/:email', ProdutosController.CountProdUser );

routes.post('/CreatAcessos', AcessosController.Creat );
routes.get('/ListAcessos', AcessosController.List );



/**
 * Private route
 */
routes.use(authMiddleware);



module.exports = routes;
