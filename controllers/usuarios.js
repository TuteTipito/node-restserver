const { request, response } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { q, nonbre = 'No name', apikey, page, limit = 10  } = req.query

    res.json({
        msg: 'get API - controller',
        q,
        nonbre,
        apikey,
        page,
        limit
     })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        msg: 'post API - controller',
        nombre,
        edad
     })
}
const usuariosPut = (req, res = response) => {

    //const id = req.params.id
    const { id } = req.params

    res.json({
        msg: 'put API - controller',
        id
     })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
     })
}

const usuariosDelete = (req, res = response) => {
    const { id } = req.params

    res.json({
        msg: 'delete API - controller',
        id
     })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}