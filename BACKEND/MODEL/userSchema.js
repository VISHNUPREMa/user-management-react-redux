const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: true
        
    },
    password: {
        type: String,
        required: true
       
    },
    image: {
        type: String,
        default: ''
    },
    isAdmin:{
        type:Number,
        default:0

    }
}, {
    timestamps: true
},
{versionkey:false});



const User = mongoose.model('User', userSchema);

module.exports =  User;