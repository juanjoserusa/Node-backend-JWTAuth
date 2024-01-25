

const validarCampos = require('./validar-campos');
const validarJWT = require('./validarJWT');
const validarRoles = require('./validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
}