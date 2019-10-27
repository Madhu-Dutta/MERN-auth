//CREATE A PRIVATE ROUTE

//import router function from express
const router = require('express').Router();
//import the private route function
const auth = require('../../middleware/auth');

router.get('/', auth, (req, res) => {
    res.json({
        posts: {
            title: 'My first location',
            description : 'Dog friendly',
            comments: 'Loved this place',
            rating: 4
        }
    })
    //res.send(req.user);
})

//Export this route
module.exports = router;