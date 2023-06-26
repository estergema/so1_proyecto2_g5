const express = require('express');
const mysql = require('mysql');

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: '34.68.177.89',
  user: 'root',
  password: 'secret',
  database: 'FASE2'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Crear una aplicación Express
const app = express();

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Configurar Socket.io
const server = app.listen(5000, function() {
  console.log('Servidor escuchando en el puerto 5000');
});




