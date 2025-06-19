let reservas = [];

function parseHora(horaStr) {
  const [h, m] = horaStr.split(':').map(Number);
  return h * 60 + m;
}

exports.crearReserva = (req, res) => {
  const { salaId, usuarioId, fecha, horaInicio, horaFin, rol = "empleado" } = req.body;

  if (!salaId || !usuarioId || !fecha || !horaInicio || !horaFin) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  if (!["admin", "recepcionista", "empleado"].includes(rol)) {
    return res.status(403).json({ error: "Rol no autorizado" });
  }

  const nuevaInicio = parseHora(horaInicio);
  const nuevaFin = parseHora(horaFin);

  const conflicto = reservas.find(r =>
    r.salaId === salaId &&
    r.fecha === fecha &&
    !(parseHora(r.horaFin) <= nuevaInicio || parseHora(r.horaInicio) >= nuevaFin)
  );

  if (conflicto) {
    return res.status(409).json({ error: "Ya existe una reserva en ese horario" });
  }

  reservas.push({ salaId, usuarioId, fecha, horaInicio, horaFin });
  return res.status(201).json({ mensaje: "Reserva creada exitosamente" });
};

exports.listarReservas = (req, res) => {
  const ordenadas = reservas.sort((a, b) => {
    const fechaA = new Date(`${a.fecha}T${a.horaInicio}`);
    const fechaB = new Date(`${b.fecha}T${b.horaInicio}`);
    return fechaA - fechaB;
  });

  return res.status(200).json(ordenadas);
};