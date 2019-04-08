var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var profile = require('../models/profile.js');

// add new profile

router.post('/create-profile', function(req, res) {
    console.log(req.body);

    profile.create({
        userId: req.body.userId,
        username: req.body.username,
        fullname: req.body.profile.fullname,
        address: req.body.profile.address,
        phonenumber: req.body.profile.phonenumber,
        skills: req.body.profile.skills,
        instagram: req.body.profile.instagram,
        linkedin: req.body.profile.linkedin,
        facebook: req.body.profile.facebook,
        twitter: req.body.profile.twitter,
        skype: req.body.profile.skype
    },  function(err, profile) {
        // if there is an error return a 500 status
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }

        // if the profile addition is successful return a json object of the profile

        res.json(profile)
    })
})

// get profile details for logged in user

router.post('/get-profile-details', function(req, res) {
    console.log(req.body);

    // search profile database for document matching the provided userid and username

    profile.findOne({
        userId: req.body.userId,
        username: req.body.username
    }, function(err, profile) {
        // if there is an error return a 500 status
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }

        // if the profile addition is successful return a json object of the profile

        res.json(profile)
    })
})

module.exports = router;