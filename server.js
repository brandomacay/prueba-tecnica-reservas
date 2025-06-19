require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reservasRouter = require('./routes/reservas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/reserva', reservasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
