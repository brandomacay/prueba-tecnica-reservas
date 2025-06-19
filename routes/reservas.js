const express = require('express');
const router = express.Router();
const { crearReserva, listarReservas } = require('../controllers/reservasController');

router.post('/', crearReserva);
router.get('/', listarReservas);

module.exports = router;