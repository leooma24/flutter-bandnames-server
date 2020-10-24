const { io } = require('../index');
// Sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.on('mensaje', (payload) => {
        console.log(payload)

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    })



   client.on('disconnect', () => {
       console.log('cliente desconectado');
   });
});