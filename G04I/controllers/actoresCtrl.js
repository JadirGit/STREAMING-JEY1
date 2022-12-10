const actoresModel = require ('../models/actoresSchema')

const actoresListar = async (req,res)=>{
try{
    const actores= await actoresModel.find()
    console.log(actores)
    res.send(actores)
}catch(err){
    if(err){
        console.log("Error actoresListar: "+err)
    }
}
}

//Actualizar
const actoresActualizar = async(req,res)=>{
    console.log(req.body)
    try{
        const {id,nombre}=req.body
        if(id==''){res.status(400).send("id de actores  no valido item")}
        if(nombre == ''){res.status(400).send("nombre de actor no valido")}
        

        else{//res.send('ok')
            const actores = {}
            actores.nombre = nombre
            
            
            
            const rta = await actoresModel.updateOne(
                {_id:id},
                {$set:actores},
                {new:true}
            )
            res.status(200).json({"msj":"Actualizado"})
        
        }  

    }
    catch(err){
        console.log("error generoActualizar"+ err)
    }

}

//guardar
const actoresGuardar = (req,res)=>{
    console.log(req.body)
    //res.status(200).json({"msj": "items guardado"})
    //res.send("ok")
    try{

       const actores = new actoresModel(req.body)
       actores.save()
       res.send("actores guardado")
   }
    catch(err){
        console.log("error actoresGuardar"+ err)
    }


}




//item obtener una sola pelicula
const actoresObtener=async(req,res)=>{
    const id = req.params.id
    console.log(id)
    try{
        const c= await actoresModel.findOne({_id:id})
        res.status(200).json(c)
    }
    catch(error){
        if(error){
            console.log("Error actoresObtener"+error)
            res.status(400).send("Error actoresObtener")
        }

    }
}



module.exports ={
    actoresListar,
    actoresObtener,
    actoresActualizar,
    actoresGuardar
    
}
