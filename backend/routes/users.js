const router = require('express').Router();
const User = require('../models/User');

router.post('/register', (req, res) => {
    User.findOne({firebaseUID: req.body.firebaseUID})
    .then(user => {
        if (user) {
            return res.status(400).json({error: "A user with this firebase UID exists"})
        }
        else {
            const newUser = new User({
                firebaseUID: req.body.firebaseUID,
                userType: req.body.userType
            })
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err));
        }
    })
})

module.exports = router;