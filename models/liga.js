const { Schema, model } = require('mongoose');

const LigaSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre de la liga es obligatorio'],
        unique: true
    },
    jornada: {
        type: String,
        required: true,
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
    }
});


module.exports = model('Liga', LigaSchema);