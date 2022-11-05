const express = require('express'); 
const app = express();
const http = require('http')
const cors = require('cors') 
const { Server } = require("socket.io");
app.use(cors());

const server =  http.createServer(app); 


const io = new Server( server, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
            },
        });

 io.on('connexion', (socket) => {
    console.log(socket.id);     

    socket.on('deconnexion', () => {
        console.log("Utilisateur Déconnecté", socket.id);
    });

 });  
    
server.listen(3001, () => {
    console.log('Server is running on port 3001');
}); 





