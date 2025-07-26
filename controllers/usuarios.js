const { request, response } = require('express')
const bctyptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios ] =  await Promise.all([ 
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number( desde ))
            .limit(Number( limite ))
    ])

    res.json({
        total,
        usuarios
     })
}

const usuariosPost = async (req, res = response) => {
    const { nombre, email, password, rol } = req.body;
    try {
        const usuario = new Usuario({ nombre, email, password, rol });

        // Encriptar la contraseña
        const salt = bctyptjs.genSaltSync();
        usuario.password = bctyptjs.hashSync(password, salt)

        await usuario.save();

        res.status(201).json({
            msg: 'Usuario creado con éxito',
            usuario
        });
        
    } catch (error) {
        console.error('Error al crear usuario:', error.message);

        res.status(400).json({
            msg: 'Error al crear usuario',
            error: error.message
        });
    }
}

const usuariosPut = async(req, res = response) => {

    //const id = req.params.id
    const { id } = req.params
    const { _id, password, google, ...resto } = req.body

    if( password ) {
        // Encriptar la contraseña
        const salt = bctyptjs.genSaltSync();
        resto.password = bctyptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json({
        msg: 'Usuario actualizado con éxito',
        usuario
     })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
     })
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params

    // Borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        msg: 'Usuario borrado con éxito',
        usuario
     })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}