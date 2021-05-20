const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];
const users = [];

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
})

const server = app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('newUser', (newUser) => {
        console.log('Oh, I have a new user: ' + newUser.name + ' user id: ' + socket.id);
        let user = {name:'', id:''};
        user.name = newUser.name;
        user.id = socket.id;
        users.push(user);
        console.log(users);

        let message = {author: 'Chat bot', content: ''};
        message.content = newUser.name + ' has joined the conversation!';

        socket.broadcast.emit('message', message);
    });
    socket.on('message', (message) => { 
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
        console.log(message);
    });
    socket.on('disconnect', () => { 
        console.log('Oh, socket ' + socket.id + ' has left');
        users.forEach(user => {
            if(user.id == socket.id){
                const index = users.indexOf(user);

                let message = {author: 'Chat bot', content: ''};
                message.content = user.name + ' has left the conversation!';

                socket.broadcast.emit('message', message);
                users.splice(index, 1);
                console.log(users);
            }
        }); 
    });
    console.log('I\'ve added a listener on message and disconnect events \n');
  });