//listar

const generoModel = require ('../models/generoSchema')
const generoListar = async (req,res)=>{

    const generos = await generoModel.find()
    console.log(generos)
    res.send(generos) 
}




//actualizar
//Actualizar
const generoActualizar = async(req,res)=>{
    console.log(req.body)
    try{
        const {id,nombre}=req.body
        if(id==''){res.status(400).send("id de genero  no valido item")}
        if(nombre == ''){res.status(400).send("nombre de genero no valido")}
        

        else{//res.send('ok')
            const genero = {}
            genero.nombre = nombre
            
            
            
            const rta = await generoModel.updateOne(
                {_id:id},
                {$set:genero},
                {new:true}
            )
            res.status(200).json({"msj":"Actualizado"})
        
        }  

    }
    catch(err){
        console.log("error generoActualizar"+ err)
    }

}


//item obtener una sola pelicula
const generoObtener=async(req,res)=>{
    const id = req.params.id
    console.log(id)
    try{
        const c= await generoModel.findOne({_id:id})
        res.status(200).json(c)
    }
    catch(error){
        if(error){
            console.log("Error generoObtener"+error)
            res.status(400).send("Error generoObtener")
        }

    }
}



//Eliminar


//Guardar

const generoGuardar = (req,res)=>{
    console.log(req.body)
    //res.status(200).json({"msj": "items guardado"})
    //res.send("ok")
    try{

       const genero = new generoModel(req.body)
       genero.save()
       res.send("genero guardado")
   }
    catch(err){
        console.log("error generoGuardar"+ err)
    }


}



module.exports ={
    generoListar,
    generoGuardar,
    generoObtener,
    generoActualizar
    
}
