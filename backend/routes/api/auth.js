//authentication routes
const express = require('express');
//import router function from express
const router = require('express').Router();
//Import bcrypt
const bcrypt = require('bcryptjs');
//Import jwt
const jwt = require('jsonwebtoken');
//import the user model
const User = require('../../model/User');
//import auth middleware
const auth = require('../../middleware/auth');

//set up empty register router (localhost:5000/api/auth)
//route: POST api/auth
//Desc: Auth user
//access: public

router.post('/', (req, res) => {
    // res.send('register');
    //Destructuring all body fields
    const {email, password} = req.body;
    //simple validation
    if( !email ||!password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    //Check for existing user
    //Look for emails in User model
    User.findOne({email})
    //If user exists
    .then(user => {
        if(!user) return res.status(400).json({msg : 'User does not exist'});
    
        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: 'invalid credentials'})

            jwt.sign(
                //Payload
                {id: user.id},
                //Secret token
                process.env.TOKEN_SECRET,
                //Expire
                {expiresIn: 3600},
                //callback
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email 
                        }
                    })
                }
            )
        })
    })
});

//For session storage/cookies
//GET api/auth/user
//Auth user
//access private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    //Disregard password
    .select('-password')
    //validate user with token
    .then(user => res.json(user));
})

//exporting router
module.exports = router;

