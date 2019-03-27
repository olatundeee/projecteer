var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var teams = require('../models/teams.js');

// add new team

router.post('/add-new-team', function(req, res, next) {
    // console.log(req.body);

    // use the teams model to create a new document in the database and store team data

    teams.create({
        team_name: req.body.team_name,
        team_project: req.body.team_project,
        team_lead: req.body.team_lead,
        team_description: req.body.team_description,
        team_projectId: req.body.team_projectId,
        team_isCreated: 'true'
    }, function(err, team) {
        if(err) {
            console.log(err);
        }

        res.json(team)
    })
})

module.exports = router;