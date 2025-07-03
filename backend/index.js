const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS (ajusta el origen según tu frontend)
app.use(cors());
app.use(express.json());

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto por tu usuario de MySQL
  password: 'root', // Cambia esto por tu contraseña de MySQL
  database: 'ZEUS_SAFETY_INTEGRADOR' // Cambia esto por el nombre de tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado a MySQL');
});

// Endpoint para obtener todos los clientes
app.get('/api/clientes', (req, res) => {
  db.query('SELECT cli.ID_CLIENTE AS id, cli.NOMBRE AS nombre,cli.TIPO_CLIENTE AS tipo_cliente,cli.RUC AS ruc,cli.TELEFONO AS telefono,cli.LUGAR AS lugar FROM cliente AS cli', (err, results) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      return res.status(500).json({ error: 'Error al obtener clientes' });
    }
    res.json(results);
  });
});

app.post('/api/clientes', (req, res) => {
  const { nombre, tipo_cliente, ruc, telefono, lugar } = req.body;
  const sql = 'INSERT INTO cliente (NOMBRE, TIPO_CLIENTE, RUC, TELEFONO, LUGAR) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, tipo_cliente, ruc, telefono, lugar], (err, result) => {
    if (err) {
      console.error('Error al crear cliente:', err);
      return res.status(500).json({ error: 'Error al crear cliente' });
    }
    // Devolver el nuevo cliente con su ID
    res.json({ id: result.insertId, nombre, tipo_cliente, ruc, telefono, lugar });
  });
});

app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, tipo_cliente, ruc, telefono, lugar } = req.body;
  const sql = 'UPDATE cliente SET NOMBRE=?, TIPO_CLIENTE=?, RUC=?, TELEFONO=?, LUGAR=? WHERE ID_CLIENTE=?';
  db.query(sql, [nombre, tipo_cliente, ruc, telefono, lugar, id], (err) => {
    if (err) {
      console.error('Error al actualizar cliente:', err);
      return res.status(500).json({ error: 'Error al actualizar cliente' });
    }
    res.json({ id, nombre, tipo_cliente, ruc, telefono, lugar });
  });
});

app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM cliente WHERE ID_CLIENTE=?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error al eliminar cliente:', err);
      return res.status(500).json({ error: 'Error al eliminar cliente' });
    }
    res.json({ success: true });
  });
});

// Endpoint para obtener todo el personal
app.get('/api/personal', (req, res) => {
  const sql = `SELECT 
    usuarios.ID_USUARIO AS id,
    rol.NOMBRE AS rol,
    usuarios.NOMBRE_USUARIO AS nombre_usuario,
    usuarios.CLAVE AS clave,
    usuarios.ID_ROL AS id_rol,
    usuarios.FECHA_CREACION AS fecha_creacion
  FROM usuarios INNER JOIN rol ON usuarios.ID_ROL = rol.ID_ROL`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener personal:', err);
      return res.status(500).json({ error: 'Error al obtener personal' });
    }
    res.json(results);
  });
});

// Crear personal
app.post('/api/personal', (req, res) => {
  const { nombre_usuario, clave, id_rol } = req.body;
  const sql = 'INSERT INTO usuarios (NOMBRE_USUARIO, CLAVE, ID_ROL, FECHA_CREACION) VALUES (?, ?, ?, NOW())';
  db.query(sql, [nombre_usuario, clave, id_rol], (err, result) => {
    if (err) {
      console.error('Error al crear personal:', err);
      return res.status(500).json({ error: 'Error al crear personal' });
    }
    res.json({ id: result.insertId, nombre_usuario, clave, id_rol });
  });
});

// Editar personal
app.put('/api/personal/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, clave, id_rol } = req.body;
  const sql = 'UPDATE usuarios SET NOMBRE_USUARIO=?, CLAVE=?, ID_ROL=? WHERE ID_USUARIO=?';
  db.query(sql, [nombre_usuario, clave, id_rol, id], (err) => {
    if (err) {
      console.error('Error al actualizar personal:', err);
      return res.status(500).json({ error: 'Error al actualizar personal' });
    }
    res.json({ id, nombre_usuario, clave, id_rol });
  });
});

// Eliminar personal
app.delete('/api/personal/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE ID_USUARIO=?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error al eliminar personal:', err);
      return res.status(500).json({ error: 'Error al eliminar personal' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
}); 