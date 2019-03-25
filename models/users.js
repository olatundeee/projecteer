var mongoose = require('mongoose');

// schema for user registration

var usersSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    role: String
})

module.exports = mongoose.model('Users', usersSchema)