const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async( req = request, res = response, next) =>{

    // en el header el nombre del header
    const token = req.header('x-token');
   
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido - usuario no existe en DB'
            })
        }

        // Verificar si el uid tiene el estado en true

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido - usuario con estado en false'
            })
        }


        req.usuario = usuario

        next()
    } catch (error) {
        
        return res.status(401).json({
            msg:'token no valido'
        })
    }

  

}

module.exports={
    validarJWT
}



