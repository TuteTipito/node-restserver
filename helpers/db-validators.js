const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const existeEmail = async(email = '') => {
    const existeEmail = await Usuario.findOne({ email })
    if ( existeEmail ) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const existeUsuarioById = async(id = '') => {
    const existeUsuario = await Usuario.findById({ id })
    if ( !existeUsuario ) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById
}