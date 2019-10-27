const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {       
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    // lastName: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    // membershipType: {
    //     type: String,
    //     required: true
    // },
    // title: {
    //     type: String,
    //     required: true,
    //     max: 10,
    //     min: 6
    // },
    // streetAddress: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 6
    // },
    // suburb: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 6
    // },
    // state: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 6
    // },
    // dogName: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    // postcode: {
    //     type: Number,
    //     required: true
    // },
    // phone: {
    //     type: Number,
    //     required: true
    // },
    // breed: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    // organization: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    // dogGuideProv: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    // position: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    // trainedFor: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 6
    // },
    // workFor: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    // otherTraining: {
    //     type: String,
    //     max: 255,
    //     min: 6
    // },
    register_date: {
        type: Date,
        default: Date.now
    }
})

//export the mongoose schema and model
module.exports = mongoose.model('User', userSchema);