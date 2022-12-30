const express = require('express'); 
const app = express();
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const Message = require('./models/Message');

const rooms = ['Room1', 'Room2','Room3']; 
const cors = require('cors'); 

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

 
async function getLastMessagesFromRoom(room) {
    let roomMessages = await Message.aggregate([
      {$match: { to: room}},
      { $group: { _id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ])
    return roomMessages;
  }

  function sortRoomMessagesByDate(messages){
    return messages.sort((a, b) => {
        let dateA = a._id.split('/').reverse().join('');
        let dateB = b._id.split('/').reverse().join('');

        dateA = dateA.split(':').join('');
        dateB = dateB.split(':').join('');

        return dateA - dateB; 
    })
  }

io.on('connection', (socket) => {


    socket.on('new-user', async ()=> {
        const members = await User.find();
        io.emit('new-user', members)
      })
    

    socket.on('joinRoom', async(room) => {
        socket.join(room);
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages);

    }) 

    socket.on('message-room', async(room, content, sender, time, date) => {
      console.log('new message',content);
      const newMessage = await Message.create({content, from: sender, time, date, to: room});
      let roomMessages = await getLastMessagesFromRoom(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      io.to(room).emit('room-messages', roomMessages);
      socket.broadcast.emit('notifications', room)
    })

})


server.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
}
);




