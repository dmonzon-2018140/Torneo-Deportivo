const { request, response, json } = require('express');
const Equipo = require('../models/equipo');

const getEquipos = async(req = request, res = response) => {
    const query = { estado: true };

    const listaEquipos = await Promise.all([
        Equipo.countDocuments(query),
        Equipo.find(query).populate('usuario', 'nombre').populate('liga', 'nombre')
    ]);

    res.json({
        msg: 'Lista de equipos',
        listaEquipos
    });
}

const getEquipoId = async(req = request, res = response) => {
    const { id } = req.params;
    const equipoId = await Equipo.findById(id).populate('usuario', 'nombre').populate('liga', 'nombre');

    res.status(201).json(equipoId);
}

const postEquipos = async(req = request, res = response) => {
    const { estado, usuario, ...body } = req.body;

    const equipoDB = await Equipo.findOne({ nombre: body.nombre });

    if ( equipoDB ) {
        return res.status(400).json({
            msg: `El equipo ${ equipoDB.nombre }, ya existe en la DB`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre,
        usuario: req.usuario._id
    }

    const equipo = await Equipo( data );

    await equipo.save();

    res.status(201).json( equipo );
}

const putEquipo = async(req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    if ( resto.nombre ) {
        resto.nombre;
        resto.usuario = req.usuario._id;
    }
    
    const equipoCambiado = await Equipo.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json({
        msg: 'Put Equipo',
        equipoCambiado
    })
}

const deleteEquipo = async(req = request, res = response) => {
    const { id } = req.params;

    const equipoEliminado = await Equipo.findByIdAndDelete(id);

    res.json({
        msg: 'Delete Equipo',
        equipoEliminado
    })
}

module.exports = {
    getEquipos,
    getEquipoId,
    postEquipos,
    putEquipo,
    deleteEquipo
}