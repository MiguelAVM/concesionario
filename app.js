const express=require('express');
const morgan=require('morgan'); 
const app=express();
const path=require('path');
//const session = require('express-session')
const colors=require('colors');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'vista'));

app.use(express.urlencoded({extended:true}));
app.use(require('./Rutas/rutas'));
app.use((err,req,res,next)=>{
    res.send({err:err.message});
});



app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.log(`En el servidor ${app.get('port')}`)
});




/*console.log("Hola :V".red)
console.log(colors.rainbow("MAMAHUEVOOOO"));*/

/*const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(colors.rainbow("En conexion"));
    res.end("Conexion Realizada")

});*/




/*server.listen(3000,()=>{
    console.log(colors.rainbow("Esperando..."));
})*/
