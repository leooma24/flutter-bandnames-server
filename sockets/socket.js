const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Héroes del Silencio') );
bands.addBand( new Band('Metallica') );

// Sockets
io.on('connection', client => {
    console.log('cliente conectado');
    client.emit('active-bands', bands.getBands() );

    client.on('mensaje', (payload) => {
        console.log(payload)

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    })

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('emitir-mensaje', ( payload ) => {
        console.log(payload)
        client.broadcast.emit('nuevo-mensaje', payload);
    });

    client.on('vote-band', (payload) => {
        bands.voteBand( payload.id )
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {
        bands.addBand( new Band( payload.name ) );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });
});