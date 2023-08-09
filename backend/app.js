const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const matches = require('./model/match');

const http = require("http");
const server = http.createServer(app);
const socket = require('socket.io');
const io = new socket.Server(server, {
  transports: ['websocket']
});



// Armazenar os sockets de usuário por ID
const userSockets = {};

io.on('connection', (socket) => {
  //console.log('Nova conexão estabelecida');

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});
  
io.on('connect_failed', (err) => {
  console.log(`connect_failed due to ${err.message}`);
});

  // Guardar o socket do usuário quando o ID do usuário é fornecido
  socket.on('register', (userId) => {
    console.log("Registrando", userId)
    userSockets[userId] = socket;
  });

  // Rota para enviar mensagem a um usuário específico
  socket.on('privateMessage', async ({ sender, receiver, message }) => {
    
    try{

      const ObjectId = mongoose.Types.ObjectId;

      const match = await matches.findOneAndUpdate(
        { $and: [
          { users: { $elemMatch: { _id: new ObjectId(sender) }}},
          { users: { $elemMatch: { _id: new ObjectId(receiver) } }}
        ]},
        {$push:{messages: {sender, message, timestamp: Date.now()}}},
        {new:true}
      )

      if(!match){
        console.log(`Match não existe`);
        return;
      }

      if (userSockets[receiver]) {
        console.log("Mensagem enviada")
        console.log(message)
        userSockets[receiver].emit('receiveMessage', message);
      } else {
        console.log(`Usuário ${receiver} não encontrado`);
      }

    }catch{
      console.log('Erro na criação da mensagem');
    }

  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
    // Remover o socket do usuário quando desconectar
    for (let userId in userSockets) {
      if (userSockets[userId] === socket) {
        delete userSockets[userId];
        break;
      }
    }
  });
});

const url = config.bd_string;
const options = { useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);


mongoose.connection.on('erro', (err)=>{
    console.log("Erro na conexão com o banco de dados " + err);
})

mongoose.connection.on('disconnected', ()=>{
    console.log("Aplicação desconectada com o banco de dados!");
})

mongoose.connection.on('connected', ()=>{
    console.log("Aplicação conectada com o banco de dados!");
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');
const matchesRoute = require('./Routes/matches');

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/matches', matchesRoute);


const port = 3000;
server.listen(port, () => {
  const message =
    process.env.PROD_ENV === 'true' ? (
      'Server is running in production environment'
    ) : `Server is running on http://localhost:${port}`;
  console.log(message);
});

module.exports = app;
