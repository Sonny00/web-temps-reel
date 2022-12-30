const mongoose = require('mongoose');
require ('dotenv').config();

mongoose.set('strictQuery', false);


mongoose.connect(`mongodb+srv://chatbot-user:aTXhO7xXHsbDvnHq@cluster0.uw53hoq.mongodb.net/?retryWrites=true&w=majority`, (err) => {
if (err) {
    console.log(err);
} else {
    console.log('Connecté !!!');
    console.log(`${process.env.DB_PW}`)

}
}); 




