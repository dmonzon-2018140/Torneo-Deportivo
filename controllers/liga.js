const { request, response } = require('express');
const Liga = require('../models/liga');

const getLigas = async (req = request, res = response) => {
    const query = { estado: true };

    const listaLigas = await Promise.all([
        Liga.countDocuments(query),
        Liga.find(query).populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'get Ligas',
        listaLigas
    });
}

const getLigaById = async (req = request, res = response) => {
    const { id } = req.params;
    const ligaId = await Liga.findById(id).populate('usuario', 'nombre');

    res.status(201).json(ligaId);
}

const postLigas = async(req = request, res = response) => {
    const {nombre, jornada} = req.body;

    const ligaDB = await Liga.findOne({ nombre, jornada });

    if (ligaDB) {
        return res.status(400).json({
            msg: `La liga ${ligaDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        jornada,
        usuario: req.usuario._id
    }

    const liga = new Liga(data);

    await liga.save();

    res.status(201).json(liga);
 }

const putLiga = async(req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre;
    resto.jornada;
    resto.usuario = req.usuario._id;

    const ligaModificada = await Liga.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(ligaModificada);
 }

const deleteLiga = async(req = request, res = response) => {
    const { id } = req.params;

    const ligaClausurada = await Liga.findByIdAndDelete( id);

    res.status(201).json(ligaClausurada);
 }

module.exports = {
    getLigas,
    getLigaById,
    postLigas,
    putLiga,
    deleteLiga
}