
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, tieneRol, esAdminRole} =require('../middlewares')

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validarJWT');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

const { esRolValido,existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check,
    check('id').custom(existeUsuarioPorID),
    check('rol').custom( esRolValido),
    validarCampos
 ],usuariosPut);
   

router.post('/', [
    // check('correo', "El correo no es valido").isEmail(),
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "La contraseña tiene que tener un minimo de 6 caracteres").isLength(6),
    check('password', "La contraseña es obligatoria ").not().isEmpty(),
    // check('rol', "No es un rol valido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido) ,
    check('correo').custom(existeEmail),
    validarCampos
] ,usuariosPost);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROLE',"VENTAS_ROLE"),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);











module.exports = router






