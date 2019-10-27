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

//set up empty register router (localhost:5000/api/users)
//route: POST api/users
//Desc: Register/Create a new user
//access: public

router.post('/', (req, res) => {
    // res.send('register');
    //Destructuring all body fields
    const {name, email, password} = req.body;
    //simple validation
    if(!name || !email ||!password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    //Check for existing user
    //Look for emails in User model
    User.findOne({email})
    //If user exists
    .then(user => {
        if(user) return res.status(400).json({msg : 'User already exists'});
    })

    //No User, so create a new one
    const newUser = new User({
        name,
        email,
        password
    })
    //Create salt  & hash
    bcrypt.genSalt(10, (err, salt) => {
        //Bcrypt hash takes newUser password, generated salt, (possible err and hashed response)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            //throw err if any
            if(err) throw err;
            //save the new hashed pw
            newUser.password = hash;
            //save the newUser in db
            newUser.save()
            //returns a promise with the new user
            .then(user => {
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
    })
});

//exporting router
module.exports = router;

