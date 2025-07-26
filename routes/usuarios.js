const { Router } = require('express') 
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos'); 
const { esRoleValido, existeEmail, existeUsuarioById } = require('../helpers/db-validators'); 
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( existeEmail ),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('_id', 'No es un ID valido').isMongoId(),
    check('_id').custom( existeUsuarioById ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id', [
    check('_id', 'No es un ID valido').isMongoId(),
    check('_id').custom( existeUsuarioById ),
    validarCampos
], usuariosDelete)


module.exports = router
