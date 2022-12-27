const mongoose = require('mongoose');
require ('dotenv').config();

mongoose.connect(`mongodb+srv://chatbot-user:${process.env.DB_pw}@cluster0.nrkla77.mongodb.net/?retryWrites=true&w=majority`, () => 
console.log('Connexion à la base de données réussie !')
);


