const express = require('express'); 
const app = express();
const userRoutes = require('./routes/userRoutes');        
const User = require('./models/User');
const Message = require('./models/Message');

const rooms = ['Salon 1', 'Salon 2','Salon 3']; 
const cors = require('cors'); 
let createdRoom = []; 
var max  = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
require('./connection');

const server = require('http').createServer(app);
const PORT  = 5001;
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

app.get('/rooms', (req, res)=> {
    res.json(rooms)
  })
// Récupérer les messages d'un salon 
async function getLastMessagesFromRoom(room) {
    let roomMessages = await Message.aggregate([
      {$match: { to: room}},
      { $group: { _id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ])
    return roomMessages;
  }
// Trier les messages par date
function sortRoomMessagesByDate(messages){
  return messages.sort(function(a, b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1]
    date2 =  date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1
  })
}

// Compter le nombre d'utilisateurs dans un salon
function countUsersInRoom(room){
  let users = 0;
  for (let [id, socket] of io.of("/").sockets) {
    if (socket.rooms.has(room)) {
      users++;
    }
  }
  return users;
}


function countNumberofRequest(data){
  let count = 0;
  for(let i = 0; i < data.length; i++){
    console.log(data[i])
}
}

// Connection d'un utilisateur 
io.on('connection', (socket) => {
    socket.on('new-user', async ()=> {
        const members = await User.find();
        io.emit('new-user', members)
  })

  socket.on("request_communication", () => {
    console.log("Communication requested");
    socket.broadcast.emit("request_pending");
  });

  socket.on("accept_communication", () => {
    console.log("Communication accepted");
    const currentRoomId = roomId;
    socket.join(currentRoomId.toString());
    socket.to(currentRoomId.toString()).emit("room_created", currentRoomId);
    roomId += 1;
  });
  
  socket.on("send_message", ({ roomId, message }) => {
    console.log(`Message "${message}" sent to room ${roomId}`);
    socket.to(roomId).emit("new_message", message);
  });


    // Rejoindre un salon 
    socket.on('join-room', async(newRoom, previousRoom,capacity) => {
        socket.join(newRoom)
        socket.leave(previousRoom);
        let roomMessages = await getLastMessagesFromRoom(newRoom);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages);
        io.emit('room-users', newRoom, countUsersInRoom(newRoom), max);
    }) 
    // Envoi d'un message dans un salon 
    socket.on('message-room', async(room, content, sender, time, date) => {
      const newMessage = await Message.create({content, from: sender, time, date, to: room});
      let roomMessages = await getLastMessagesFromRoom(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      
      io.to(room).emit('room-messages', roomMessages);
      socket.broadcast.emit('notifications', room)
    }) 

    // Création d'un nouveau salon 
    socket.on('create-room', async(room) => {
      if(!createdRoom.includes(room)){ 
        createdRoom.push(room);
        rooms.push(room);
        io.emit('new-room', room);
      }
    })

    //Compter le nombre d'utilisateurs dans un salon
    socket.on('room-users', async(room) => {
      io.emit('room-users', room, countUsersInRoom(room));
    })


// Demande de communication avec un Admin 
socket.on("request-communication", (data) => {
if(1){
io.emit('showButtonToAccept')
  }
})

    // Edition d'un salon 
 socket.on('edit-room-name', async(oldRoom, newRoom) => {
    const index = rooms.indexOf(oldRoom);
    if (index > -1) {
      rooms.splice(index, 1, newRoom);
    }
    io.emit('edit-room', oldRoom, newRoom);
  })
  
    // Affichage des salons 
  socket.on('display-rooms', async() => {
    io.emit('display-rooms', rooms);
  })

  // Suppression d'un salon 
  socket.on('delete-room-by-name', async(room) => {
    const index = rooms.indexOf(room);
      if (index > -1) {
        rooms.splice(index, 1);
        }
        io.emit('delete-room', room);
    })
    
  socket.on('messagess', (msg) => {
    let response = '';
    response = "Salut ! Comment puis-je vous aider ? " 
     if (msg === 'help') {
       response = "Souhaitez-vous vérifier votre véhicule ? Tapez 'Véhicule' Si vous souhaitez des informations sur les véhicules disponibles, tapez 'Véhicules disponibles' Si vous souhaitez des informations de contact, tapez 'Contact'"
    } else if (msg === 'Véhicule') {
      response = "Veuillez entrer l'année de votre véhicule"
      let annee = msg;
      console.log(annee)
      } else {
      response = 'Je ne comprends pas ce que vous voulez dire. Tapez help pour voir les commandes disponibles.';
    }

    // Envoi de la réponse au client
    socket.emit('response', response);
  });
    
    

    // Déconnexion d'un utilisateur 
    app.delete('/deconnexion', async(req, res)=> {
      try {
        const {_id, newMessages} = req.body;
        const user = await User.findById(_id);
        user.status = "offline";
        user.newMessages = newMessages;
        await user.save();
        const members = await User.find();
        socket.broadcast.emit('new-user', members);
        res.status(200).send();
      } catch (e) {
        console.log(e);
        res.status(400).send()
      }
    })
    

})

// Lancement du serveur 
server.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
}
);




