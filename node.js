const path = require('path');
const express = require('express');
const app = express();

const SocketIO = require('socket.io');

app.set('port',process.env.PORT || 80);

app.use(express.static(path.join(__dirname,'pizarra')));

const server = app.listen(app.get('port'),()=>{
    console.log('Server start in '+app.get('port'));
})

const io = SocketIO.listen(server);

io.on('connection',(socket)=>{
    console.log('New user conection!');
    socket.on('pizarra:draw',(params)=>{
        io.sockets.emit('pizarra:draw',params);
    });
})