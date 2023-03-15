const router = require('express').Router(); 
const User = require('../models/User'); 

// Inscription Utilisateur
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (e) {
        let message;
        if (e.code === 11000) {
            message = "L'utilisateur existe déjà";
        } else {
            message = e.message;
        }
        console.log(e);
        res.status(400).json({ message });
    }
})


// Connexion Utilisateur 

router.post('/connexion', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        user.status = 'online';
        await user.save();
        res.status(200).json(user);
    } catch(e) {
        res.status(400).json(e.message)
    }
})

module.exports = router; 

