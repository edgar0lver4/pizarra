const path = require('path');
const express = require('express');
const app = express();

const SocketIO = require('socket.io');
//Settings
app.set('port', process.env.PORT || 3000);

//Statics files
app.use(express.static(path.join(__dirname,'public')));

//start the server
const server = app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
});
const io = SocketIO.listen(server);
//Websockets
io.on('connection',(socket)=>{
   console.log('new connection',socket.id);
   
   //Escuchamos el evento
   socket.on('chat:message',(data)=>{
       io.sockets.emit(`chat:message:${data.id}`,data);
       console.log(data);
   })
})