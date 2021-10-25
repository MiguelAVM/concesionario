$(document).ready(function(){


    $('.btnact').on('click',function(){
        
        let btn=$('.btnact').index(this);
        alert(btn);  
        let id=$('.usuid').eq(btn);   
        let nombre=$('.datnombre').eq(btn);
        let apellido=$('.datapellido').eq(btn);
        let telefono=$('.datelefono').eq(btn);
        let correo=$('.datcorreo').eq(btn);
        
        
        let i=id.val();
        let n=nombre.val();
        let a=apellido.val();
        let t=telefono.val();
        let c=correo.val();
    
    
        alert("datos"+n+a+t+c+i);
    
        $.ajax({
            type:"POST",
            url:'/act_dat',
            data:{
                nn:n,aa:a,tt:t,cc:c,ii:i
            }
        })
    });
    });
    