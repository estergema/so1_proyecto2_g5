const { createClient } = require('redis');
const express = require('express');
const port = process.env.PORT | 4000;

const app = express();

const client = createClient({
    host: '10.103.169.107',
    port: 6379
}); //creates a new client


client.on('error', err => console.log('Redis Client Error', err));


client.on('connect', () => {
    console.log('Conexión establecida con Redis');

    // Obtener todas las claves en Redis
   /* client.keys('*', (error, keys) => {
        if (error) {
            console.error('Error al obtener las claves:', error);
        } else {
            console.log('Claves en Redis:', keys);
        }
    });*/

    app.listen(port, () => console.log('Server levantado en el puerto', port));
});



/*app.get("/getData", async (req, res) => {
    await client.connect();
    let data = await client.hGetAll("Love-1967-Forever_Changes");
    return res.json(data);
});
*/


/*app.listen(port, () => {
    console.log("Listen on port ", port);
});*/