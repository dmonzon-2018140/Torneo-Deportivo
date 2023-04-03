const { Schema, model } = require('mongoose');

const EquipoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre del equipo es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    integrantes: {
        type: Number,
        default: 0
    },
    liga: {
        type: Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    },
    goles_favor: { type: Number },
    goles_contra: { type: Number },
    diferencia_goles: { type: Number },
    partidos: { type: Number }

});

module.exports = model('Equipo', EquipoSchema);