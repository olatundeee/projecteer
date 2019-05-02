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

// get list of team members from the database and send back to the front end

router.post('/get-team-members', function(req, res) {

    // search the database for documents containing the requested team name and id

    teamMembers.find(req.body, function(err, members) {
        // if an error is encountered return a 500 status as response
        if(err) {
            res.sendStatus(500);
        }

        // if members are found successfully return a json object as response

        res.json(members)
    })
})

module.exports = router;