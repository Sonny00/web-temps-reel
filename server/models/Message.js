const moongoose = require('mongoose');

const messageSchema = new moongoose.Schema({
    content: String,
    from: Object,
    socketId: String,
    time: String,
    date: String,
    to: String,
})

const Message = moongoose.model('Message', messageSchema);

module.exports = Message; 
