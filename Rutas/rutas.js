const express=require('express');
const rutas=express.Router();  
const controller=require('../controlador/controller');
rutas.get('/',controller.index);
rutas.post('/login',controller.login);


rutas.get('/vehiculos',controller.consulvehiculos);
rutas.post('/frminsertar',controller.insertar_vehiculos);

rutas.get('/usuario',controller.consulusu);

rutas.get('/datos',controller.consuldat);
rutas.post('/act_dat',controller.datos_actualizar);

rutas.get('/compra_ve',controller.compra);
rutas.post('/frminsertar_compra',controller.compra);
module.exports=rutas