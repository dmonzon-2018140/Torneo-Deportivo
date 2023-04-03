const { Router } = require('express');
const { check } = require('express-validator');
const { getLigas, getLigaById, postLigas, putLiga, deleteLiga } = require('../controllers/liga');
const { existeLigaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getLigas);

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeLigaPorId),
    validarCampos
], getLigaById);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postLigas);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeLigaPorId),
    validarCampos
], putLiga);

router.delete('/eliminar/:id', [
    validarJWT, 
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeLigaPorId),
    validarCampos
], deleteLiga);

module.exports = router;