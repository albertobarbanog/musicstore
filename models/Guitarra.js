// 1. importaciones
const mongoose = require('mongoose');

// 2. schema
const guitarraSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
    },
  },
  {
    // Permite agregar la fecha en el que fue generado el documento.
    timestamps: true,
  }
);

// 3. modelo
const Guitarra = mongoose.model('Guitarra', guitarraSchema);

// 4. exportación
module.exports = Guitarra;
