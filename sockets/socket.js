const { io } = require ('../index');
const { comprobarJWT } = require('../helpers/jwt');
const {usuarioConectado, usuarioDesconectado } = require('../controllers/socket');


io.on('connection', (client) =>  {
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )

    // Verificar autenticación
    if ( !valido ) { return client.disconnect(); }
    
    // Cliente autenticado
    usuarioConectado( uid );


    console.log('cliente autenticado')



    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

/*     client.on('disconnect', (payload) => {
        console.log('mensaje', payload);

        io.emit('mensaje', {admin: 'nuevo mensaje'});
    }); */
});