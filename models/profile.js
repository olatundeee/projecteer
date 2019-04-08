var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    userId: String,
    username: String,
    fullname: String,
    address: String,
    phonenumber: String,
    skills: String,
    instagram: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    skype: String
})

module.exports = mongoose.model('Profile', profileSchema);