//authentication routes

//import router function from express
const router = require('express').Router();
//Import bcrypt
const bcrypt = require('bcryptjs');
//Import jwt
const jwt = require('jsonwebtoken');
//import the user model
const User = require('../model/User');
//import validations
const {registrationValidation, loginValidation} = require('../validation');

//set up empty register router (localhost:5000/api/user/register)
router.post('/register', async(req, res) => {

//VALIDATE THE DATA BEFORE CREATING A USER
const {error} = registrationValidation(req.body)
   if (error) return res.status(400).send(error.details[0].message);

   //Checking if the user is already in the database
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists)return res.status(400).send('Email already exists');

    //HASH the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // membershipType: req.body.membershipType,
        // title: req.body.title,
        // dob: req.body.dob,
        // streetAddress: req.body.streetAddress,
        // suburb: req.body.suburb,
        // state: req.body.state,
        // dogName: req.body.dogName,
        // postcode: req.body.postcode,
        // phone: req.body.phone,
        // breed: req.body.breed,
        // organization: req.body.organization,
        // dogGuideProv: req.body.dogGuideProv,
        // position: req.body.position,
        // trainedFor: req.body.trainedFor,
        // workFor: req.body.workFor,
        // otherTraining: req.body.otherTraining,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    // res.send('Register here');
    try{
        const savedUser = await user.save();
        res.send({user: user_id});
    }
    catch(err){
        res.status(400).send(err);
    }
});

//set up empty login router (localhost:5000/api/user/register)
router.post('/login', async(req, res) => {
    // res.send('Login here');
    //VALIDATE THE USER DATA TO LOG IN
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user)return res.status(400).send('Email does not exists');

    //PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Password is invalid");

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id: user._id}, 
        process.env.TOKEN_SECRET,
        {expiresIn: 3600},
        (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                })
            }
        );
    res.header('auth-token', token).send(token);

    //If no error log in
    // res.send('Logged In');

});

//exporting router
module.exports = router;

