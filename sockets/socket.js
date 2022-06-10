const { io } = require ('../index');
const { comprobarJWT } = require('../helpers/jwt');

io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    
    if (!valido) {return client.disconnect();}
    console.log('Cliente autenticado')

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

/*     client.on('disconnect', (payload) => {
        console.log('mensaje', payload);

        io.emit('mensaje', {admin: 'nuevo mensaje'});
    }); */
});