const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Usuario',
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'post Usuario',
        usuarioGuardadoDB
    });

}


const putUsuario = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    if ( resto.password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put Usuario',
        usuarioEditado
    });

}

const deleteUsuario = async(req = request, res = response) => {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'delete usuario',
        usuarioEliminado
    });
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}