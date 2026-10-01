// server.js
const express = require('express');
const cors = require('cors');
const productosDB = require('./data/productos');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Chrome DevTools
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.json({});
});

// ===== ENDPOINTS CRUD =====

// 1. GET /api/productos -> Listar todos
app.get('/api/productos', (req, res) => {
  res.json(productosDB.getAll());
});

// 2. GET /api/productos/:id -> Obtener uno
app.get('/api/productos/:id', (req, res) => {
  const producto = productosDB.getById(req.params.id);
  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.json(producto);
});

// 3. POST /api/productos -> Crear
app.post('/api/productos', (req, res) => {
  const { nombre, precio, stock, categoria } = req.body;
  if (!nombre || precio == null) {
    return res.status(400).json({ mensaje: 'Nombre y precio son requeridos' });
  }
  const nuevo = productosDB.create({ nombre, precio, stock: stock || 0, categoria: categoria || '' });
  res.status(201).json(nuevo);
});

// 4. PUT /api/productos/:id -> Actualizar
app.put('/api/productos/:id', (req, res) => {
  const actualizado = productosDB.update(req.params.id, req.body);
  if (!actualizado) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.json(actualizado);
});

// 5. DELETE /api/productos/:id -> Eliminar
app.delete('/api/productos/:id', (req, res) => {
  const eliminado = productosDB.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});