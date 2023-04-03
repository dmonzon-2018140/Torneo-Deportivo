const { Router } = require('express');
const { check } = require('express-validator');
const { getEquipos, getEquipoId, postEquipos, putEquipo, deleteEquipo } = require('../controllers/equipo');
const { existeEquipoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getEquipos);

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], getEquipoId);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postEquipos);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], putEquipo);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], deleteEquipo);

module.exports = router;