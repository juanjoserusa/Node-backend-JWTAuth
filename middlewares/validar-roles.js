const { request, response } = require("express")




const esAdminRole = async (req = request, res = response, next) => {


    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin validar el token'
        })
    }

    const { rol, nombre } = req.usuario;

    // if(!rol){
    //     return res.status(500).json({
    //      msg:'El usuario no tiene rol'
    //     }) 
    //  }

    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: ` ${nombre} no es administrador - No puede hacer esto`
        })
    }



    next()

}


const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin validar el token'
            })
        }

        
            if (!roles.includes(req.usuario.rol)){
                return res.status(401).json({
                    msg: `El servicio requiere uno de estos roles ${roles}`
                })
            }
            
            next()    

    
        console.log(roles);
    }

}


module.exports = {
    esAdminRole,
    tieneRol
}

