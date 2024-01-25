const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const genererarJWT = require('../helpers/generarJWT')

const login = async(req, res = response) => {

    const {correo, password} = req.body

    try {
        
        // verificar si el email existe

        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            return res.status(400).json({
                msg:' Correo / password no son correctos - correo'
            })
        }

        // Verificar si el usuario esta activo

        if(!usuario.estado) {
            return res.status(400).json({
                msg:' El usuario no esta activo'
            })
        }

        // Verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg:' Correo / password no son correctos - password'
            })
        }

        // Generar el JWT

        const token =  await genererarJWT( usuario.id )


        res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

   
}

module.exports = {
    login
}