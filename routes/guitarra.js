// 1. Importaciones
const express = require('express');
const app = express();
const Guitarra = require('../models/Guitarra');
const router = express.Router();

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// 3. Ruteo
router.get('/', async (req, res) => {
  try {
    const guitarras = await Guitarra.find({});
    res.json({ guitarras });
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error obtaining the data',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const guitarra = new Guitarra(req.body);
    const nuevaGuitarra = await guitarra.save();
    res.status(201).json(nuevaGuitarra);
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error saving the guitar',
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  try {
    const guitarraActualizada = await Guitarra.findByIdAndUpdate(
      id,
      { nombre, precio },
      { new: true }
    );
    if (!guitarraActualizada) {
      return res.status(404).json({
        msg: 'There is no guitar with that ID',
      });
    }
    res.json(guitarraActualizada);
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error updating the guitar',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const guitarraEliminada = await Guitarra.findByIdAndRemove(req.params.id);
    if (!guitarraEliminada) {
      return res.status(404).json({
        msg: 'There is no guitar with that ID',
      });
    }
    res.json({ msg: 'Guitar deleted successfully' });
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error erasing the specified guitar',
    });
  }
});

// 2. Exportación
module.exports = router;
