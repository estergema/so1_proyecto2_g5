const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


// Crear una aplicación Express
const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));


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



// Ruta GET para obtener los datos de la tabla
app.get('/getData', (req, res) => {
  connection.query(`SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
                    FROM data
                    GROUP BY album, year, artist;`, 
  (error, results) => {
    if (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    } else {
      res.json(results);
    }
  });
});


// Ruta GET para obtener los años disponibles de un artista específico
app.get('/artistas/:nombreArtista/years', (req, res) => {
  const nombreArtista = req.params.nombreArtista;

  connection.query(
    'SELECT DISTINCT year FROM data WHERE artist =  ?',
    [nombreArtista],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los años:', error);
        res.status(500).json({ error: 'Error al obtener los años' });
      } else {
        res.json(results);
      }
    }
  );
})


// Ruta GET para obtener los años disponibles de un artista específico
app.get('/artistas/:nombreArtista/albums', (req, res) => {
  const nombreArtista = req.params.nombreArtista;

  connection.query(
    'SELECT DISTINCT album FROM data WHERE artist = ?',
    [nombreArtista],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})


app.get('/artistas/:nombreArtista/dataArtist', (req, res) => {
  const nombreArtista = req.params.nombreArtista;

  connection.query(
    `SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
     FROM data
     WHERE artist = ?
     GROUP BY album, year, artist;`,
    [nombreArtista],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})

app.get('/artistas/:aniofiltro/datayear', (req, res) => {
  const anio = req.params.aniofiltro;

  connection.query(
    `SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
     FROM data
     WHERE year = ?
     GROUP BY album, year, artist;`,
    [anio],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})



app.get('/artistas/:albumfiltro/dataalbum', (req, res) => {
  const album = req.params.albumfiltro;

  connection.query(
    `SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
     FROM data
     WHERE album = ?
     GROUP BY album, year, artist;`,
    [album],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})


app.get('/artistas/:nombreArtista/:anio/dataArtisanio', (req, res) => {
  const nombreArtista = req.params.nombreArtista;
  const anioData = req.params.anio;

  connection.query(
    `SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
    FROM data
    WHERE artist = ? and year = ?
    GROUP BY album, year, artist;`,
    [nombreArtista,anioData],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})

app.get('/artistas/:nombreArtista/:album/dataArtisalbum', (req, res) => {
  const nombreArtista = req.params.nombreArtista;
  const albumData = req.params.album;

  connection.query(
    `SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
    FROM data
    WHERE artist = ? and album = ?
    GROUP BY album, year, artist;`,
    [nombreArtista,albumData],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})


app.get('/artistas/:anio/:album/dataalbumanio', (req, res) => {
  const anioData = req.params.anio;
  const albumData = req.params.album;

  connection.query(
    `SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
    FROM data
    WHERE year= ? and album = ?
    GROUP BY album, year, artist;`,
    [anioData,albumData],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})


app.get('/artistas/:artista/:anio/:album/alldata', (req, res) => {
  const artistaData = req.params.artista;
  const anioData = req.params.anio;
  const albumData = req.params.album;

  connection.query(
    `SELECT album, year, artist, AVG(ranked) AS promedio, COUNT(*) AS cantidad_rankings
    FROM data
    WHERE artist = ? and  year= ? and album = ?
    GROUP BY album, year, artist;`,
    [artistaData,anioData,albumData],
    (error, results) => {
      if (error) {
        console.error('Error al obtener los album:', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})




//Ruta GET para obtener los años disponibles de un artista específico
app.get('/artistas', (req, res) => {
  connection.query(
    'select distinct artist FROM data',
    (error, results) => {
      if (error) {
        console.error('Error al obtener los artistas:', error);
        res.status(500).json({ error: 'Error al obtener los artistas' });
      } else {
        res.json(results);
      }
    }
  );
})

app.get('/anios', (req, res) => {
  connection.query(
    'select distinct year FROM data',
    (error, results) => {
      if (error) {
        console.error('Error al obtener los anios', error);
        res.status(500).json({ error: 'Error al obtener los anios' });
      } else {
        res.json(results);
      }
    }
  );
})


app.get('/albums', (req, res) => {
  connection.query(
    'select distinct album FROM data',
    (error, results) => {
      if (error) {
        console.error('Error al obtener los albums', error);
        res.status(500).json({ error: 'Error al obtener los albums' });
      } else {
        res.json(results);
      }
    }
  );
})

// Configurar Socket.io
const server = app.listen(5000, function() {
  console.log('Servidor escuchando en el puerto 5000');
});




