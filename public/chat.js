const socket = io();
//View Section
let output = document.getElementById('output');
let actions= document.getElementById('actions');
//Text section
let username = document.getElementById('username');
let messange = document.getElementById('message');
let userIdNic= document.getElementById('nickId');
let userId = document.getElementById('userId');
//Button
let btnSend = document.getElementById('send');

btnSend.addEventListener('click',()=>{
    const messageSended = {
        user: username.value,
        messange: messange.value,
        id: userIdNic.value
    };
    socket.emit(`chat:message`,messageSended);
    output.innerHTML += `<p>
            <strong>${messageSended.user}</strong>
            <span>${messageSended.messange}</span>
        </p>`;
})
socket.on('connect',()=>{
    socketConnected = true;
    console.log(`Sala - chat:message:${socket.id}`);
    userId.value = socket.id;

    socket.on(`chat:message:${socket.id}`,(data)=>{
        output.innerHTML += `<p>
            <strong>${data.user}</strong>
            <span>${data.messange}</span>
        </p>`;
    })

});