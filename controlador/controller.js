const connection=require('../conexion/conexion');
const cnn=connection();
const {render}=require('ejs');
const { request } = require('express');
const bcryptjs=require('bcryptjs');
const controller={};
controller.index=(req,res,next)=>{
    res.render('login')
    res.send("Error en el controlador")
}




controller.consulvehiculos=(req,res,next)=>{
    cnn.query('SELECT * FROM vehiculo',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            //console.log(resbd)
            res.render('vehiculos',{datos:resbd});
        }
    })
}

controller.insertar_vehiculos=async(req,res,next)=>{
    const p=req.body.placa;
    const d=req.body.datid;
    const c=req.body.catid;
    const m=req.body.modelo;
    const ma=req.body.marca;
    const e=req.body.estado;
    const pr=req.body.precio;
    console.log(d);
    cnn.query('insert into vehiculo set?',{placa:p,datid:d,catid:c,modelo:m,marca:ma,estado:e,precio:pr},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.redirect('/vehiculos')
        }
    });
}





controller.login=async(req,res,next)=>{
    const usu=await req.body.login;
    const cla=await req.body.password;
    //console.log(usu+cla)
    
    cnn.query('SELECT * FROM usuario inner join usuario_rol on usuario_rol.usu_id=usuario.usuid WHERE usulogin=?',[usu,cla],async(err,results)=>{
        if(err){
            next(new Error("error de consulta login",err));
        }
        else if(results!=0){
            console.log("datos correctos");
            rol= results[0].rol_id;
            uss= results[0].usulogin;
            console.log(rol+".."+uss);
            if(rol==1){
                res.redirect('datos');
            }
            else if(rol===2){
                res.redirect('compra_ve');
                
            }
        }
        else{
            //console.log("datos Incorrectos");
            res.render('login')
        }
    });
}


controller.consulusu=(req,res,next)=>{
    cnn.query('SELECT * FROM usuario',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            //console.log(resbd)
            res.render('usuario',{datos:resbd});
        }
    })
}



controller.consuldat=(req,res,next)=>{
    cnn.query('SELECT * FROM datospersonales',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            //console.log(resbd)
            res.render('datos',{datos:resbd});
        }
    })
}

controller.datos_actualizar=async(req,res,next)=>{
    const id=req.body.ii;
    const nom=req.body.nn;
    const ape=req.body.aa;
    const tel=req.body.tt;
    const cor=req.body.cc;

    
    cnn.query('UPDATE datospersonales SET datnombre="'+nom+'",datapellido="'+ape+'",datelefono="'+tel+'",datcorreo="'+cor+'" WHERE usuid="'+id+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizar");
            res.redirect('datos');
        }
    })

}



controller.compra=(req,res,next)=>{
    const min=req.body.min;
    const max=req.body.max;
    cnn.query('select * from vehiculo where precio>=? and precio<=?',[min,max],(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            //console.log(resbd)
            res.render('compra_ve',{datos:resbd});
        }
    })
}
module.exports=controller;