const express = require('express');
const path = require('path');
require('dotenv').config();

//DB config

require('./database/config').dbConenection();

//App de Express
const app = express();

//Lectura y parseo del boy;;

app.use(express.json());


//node server

const server = require('http'). createServer(app);
const io = require('socket.io')(server);

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
  });

  client.on('mensaje', (payload) => { 
      console.log('Mensaje!!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
  })
});

//Path Público

const publicPath = path.resolve(__dirname, 'public' );

app.use( express.static(publicPath));

//Mis rutas

app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));

server.listen(process.env.PORT, (err) => {

    if( err ) throw new Error(err);
    
    console.log('Servidor corriendo en puerto!!!', process.env.PORT);
});