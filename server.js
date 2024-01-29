const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser'); // Asegúrate de importar bodyParser


const app = express();
const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'inventariouvm'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.post('/api/guardarInventario', (req, res) => {
  const equipo = req.body;
  guardarInventario(equipo);
  res.sendStatus(200);
});

const insertarEquipo = (equipo) => {
  const sql = 'INSERT INTO equipos (ubicacion, nombre, tipo, codigo, marca, modelo, numserie, stock, estado, tipoimpre, topomueble, tipocableado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    equipo.ubicacion,
    equipo.nombre,
    equipo.tipoEquipo,
    equipo.codigo,
    equipo.marca,
    equipo.modelo,
    equipo.numeroSerie,
    equipo.cantidad,
    equipo.estado,
    equipo.tipoImpresora || null,
    equipo.tipoMueble || null,
    equipo.tipoCable || null
  ];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar equipo:', error);
      return;
    }
    console.log('Equipo insertado correctamente en la base de datos');
  });
};

const guardarInventario = (equipo) => {
  insertarEquipo(equipo);
};

app.get('/api/equipos', (req, res) => {
  connection.query('SELECT * FROM equipos order by id desc', (error, results, fields) => {
    if (error) {
      console.error('Error al obtener equipos:', error);
      res.status(500).json({ error: 'Error al obtener equipos de la base de datos' });
      return;
    }

    // Verificar si hay resultados y enviarlos en formato de array JSON
    if (results && results.length > 0) {
      console.log('Se encontraron equipos en la base de datos: '+results);
      res.json(results);
    } else {
      console.log('No se encontraron equipos en la base de datos');
      res.status(404).json({ message: 'No se encontraron equipos en la base de datos' });
    }
  });
});

app.delete('/api/equipos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    connection.query(`DELETE FROM equipos WHERE id = ${id}`, (error, results, fields) => {
      if (error) {
        console.error('Error al eliminar el equipo:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        // Si la eliminación fue exitosa, enviar una respuesta con estado 204 (sin contenido)
        res.status(204).send();
      }
    });
  } catch (error) {
    console.error('Error al eliminar el equipo:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.put('/equipos/:id', (req, res) => {
  const equipoId = req.params.id;
  const newData = req.body;

  // Construir dinámicamente la parte de la consulta SQL para actualizar los campos
  let updateFields = '';
  const values = [];
  Object.keys(newData).forEach((key, index) => {
    if (index > 0) updateFields += ', '; // Agregar coma entre campos excepto el primero
    updateFields += `${key} = ?`;
    values.push(newData[key]); // Agregar el valor del campo al array de valores
  });

  // Consulta SQL para actualizar el equipo en la base de datos
  const sql = `UPDATE equipos SET ${updateFields} WHERE id = ?`;
  values.push(equipoId); // Agregar el ID del equipo al array de valores

  console.log(sql);

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el equipo en la base de datos:', err);
      return res.status(500).send('Error al actualizar el equipo en la base de datos');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send(`No se encontró ningún equipo con el id ${equipoId}`);
    }

    return res.status(200).json({ message: 'Equipo actualizado correctamente' });
  });
});


// Definir la ruta para actualizar un equipo por su ID
app.put('/api/equipos/:id', (req, res) => {
  const equipoId = req.params.id;
  const newData = req.body; // Los nuevos datos del equipo se deben pasar en el cuerpo de la solicitud

  // Consulta SQL para actualizar el equipo en la base de datos
  const sql = `UPDATE equipos SET ? WHERE id = ?`;
  console.log(sql);
  connection.query(sql, [newData, equipoId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el equipo en la base de datos:', err);
      res.status(500).send('Error al actualizar el equipo en la base de datos');
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send(`No se encontró ningún equipo con el id ${equipoId}`);
      } else {
        res.status(200).json({ message: 'Equipo actualizado correctamente' });
      }
    }
  });
});


// Ruta para manejar la solicitud de búsqueda de equipos
app.get('/api/equipos/busqueda', async (req, res) => {
  // Obtener los parámetros de búsqueda de la URL
  const { ubicacion, tipoEquipo, nombre, estado } = req.query;

  console.log("Parámetros de búsqueda recibidos:");
  console.log("Ubicación:", ubicacion);
  console.log("Tipo de equipo:", tipoEquipo);
  console.log("Nombre:", nombre);
  console.log("Estado:", estado);

  try {
    // Realizar la búsqueda en la base de datos según los parámetros recibidos
    
    await connection.query('SELECT * FROM equipos WHERE ubicacion like ? and tipo like ? and nombre LIKE ? and estado like ?', [`%${ubicacion}%`, `%${tipoEquipo}%`, `%${nombre}%`, `%${estado}%`], (error, results, fields) => {
    //await connection.query('SELECT * FROM equipos WHERE ubicacion like ?  and tipo like ?', [`%${ubicacion}%`,`%${tipoEquipo}%`], (error, results, fields) => {      
      console.log(results);
      res.json(results);
    });

  } catch (error) {
    console.error('Error al buscar equipos:', error);
    res.status(500).json({ error: 'Error al buscar equipos' });
  }
});


// Configurar el middleware de análisis de cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
