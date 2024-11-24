const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

       username: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-z][A-z0-9-_]{3,23}$/
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
      password: {
        type: String,
        required: true,
        
      }
}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);