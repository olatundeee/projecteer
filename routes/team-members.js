var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var teamMembers = require('../models/team-members.js');

// join a team

router.post('/join-team', function(req, res) {
    console.log(req.body);

    // create document for new team member in the database

    teamMembers.create(req.body, function(err, member) {
        // if an error is encountered return a 500 status as response
        if(err) {
            res.sendStatus(500);
        }

        // if member is added successfully return a json object as response

        res.json(member)
    })
});

// confirm if a user is a team member

router.post('/confirm-team-member', function(req, res) {
    console.log(req.body);

    // create document for new team member in the database

    teamMembers.findOne(req.body, function(err, member) {
        // if an error is encountered return a 500 status as response
        if(err) {
            res.sendStatus(500);
        }

        // if member is added successfully return a json object as response

        res.json(member)
    })
});

module.exports = router;