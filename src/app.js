const express = require('express');
const path = require('path');
const LibrosService = require('./librosService');

const app = express();
const servicio = new LibrosService();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const noEncontrado = (res) => res.status(404).json({ error: 'Libro no encontrado' });

// READ: listar (con búsqueda opcional ?q=texto)
app.get('/api/libros', (req, res) => res.json(servicio.listar(req.query.q)));

// READ: un libro
app.get('/api/libros/:id', (req, res) => {
  const libro = servicio.obtener(Number(req.params.id));
  if (!libro) return noEncontrado(res);
  res.json(libro);
});

// CREATE
app.post('/api/libros', (req, res) => {
  try {
    res.status(201).json(servicio.crear(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// UPDATE
app.put('/api/libros/:id', (req, res) => {
  try {
    const libro = servicio.actualizar(Number(req.params.id), req.body);
    if (!libro) return noEncontrado(res);
    res.json(libro);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Préstamo y devolución
app.post('/api/libros/:id/prestar', (req, res) => {
  try {
    const libro = servicio.prestar(Number(req.params.id));
    if (!libro) return noEncontrado(res);
    res.json(libro);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
});

app.post('/api/libros/:id/devolver', (req, res) => {
  try {
    const libro = servicio.devolver(Number(req.params.id));
    if (!libro) return noEncontrado(res);
    res.json(libro);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
});

// DELETE
app.delete('/api/libros/:id', (req, res) => {
  if (!servicio.eliminar(Number(req.params.id))) return noEncontrado(res);
  res.status(204).end();
});

module.exports = app;
