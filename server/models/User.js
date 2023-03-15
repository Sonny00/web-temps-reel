const mongoose = require('mongoose');
const  {isEmail} = require('validator');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({ 
    name: { 
        type: String,
        required: [true,"Ne peut pas être vide"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true,"Ne peut pas être vide"],
        index: true,
        validate: [isEmail,"Email non valide"]
    },
    password: {
        type: String,
        required: [true,"Ne peut pas être vide"],
    },
    newMessages: { 
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: 'online'
    },

    role: {
        type: String, 
        default: 'utilisateur'
    }}, 
    
    {minimize: false});


    userSchema.pre('save', function(next){
        const user = this;
        if(!user.isModified('password')) return next();
      
        bcrypt.genSalt(10, function(err, salt){
          if(err) return next(err);
      
          bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
      
            user.password = hash
            next();
          })
      
        })
      
      })


    userSchema.methods.toJSON = function () {
        const user = this;
        const userObject = user.toObject();
        delete userObject.password;
        return userObject;
    }


    userSchema.statics.findByCredentials = async (email, password) => {
        const user = await User.findOne({email});
        if (!user) { throw new Error('Email ou mot de passe incorrect') }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { throw new Error('Email ou mot de passe incorrect') }
        return user;
    } 



    const User = mongoose.model('User', userSchema);
    module.exports = User;





