var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var teams = require('../models/teams.js');

// get all teams

router.get('/get-all-teams', function(req, res, next) {
    // search through the teams database and return all objects in the database

    teams.find({}, function(err, tasks) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(tasks)
    })
})

// add new team

router.post('/add-new-team', function(req, res, next) {

    // use the teams model to create a new document in the database and store team data

    teams.create({
        team_name: req.body.team_name,
        team_project: req.body.team_project,
        team_lead: req.body.team_lead,
        team_lead_id: req.body.team_lead_id,
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

router.post('/get-user-team', function(req, res){

    // search through the teams database and return the team matching the search criteria

    teams.findOne({
        team_projectId: req.body.team_projectId
    }, function(err, team) {
        // if there is an error return a status 500 response

        if(err) {
            return res.sendStatus(500);
        }

        res.json(team);
    })
})

router.post('/get-all-user-team', function(req, res){

    // search through the teams database and return the team matching the search criteria

    teams.find({
        team_lead_id: req.body.team_lead_id
    }, function(err, team) {
        // if there is an error return a status 500 response

        if(err) {
            return res.sendStatus(500);
        }

        res.json(team);
    })
})

// delete a particular team

router.post('/disband-team', function(req, res) {

    // search through the teams database and delete and team with matching _id

    teams.findByIdAndRemove(req.body.teamId, function(err, team) {
         // if there is an error return a status 500 response

         if(err) {
            return res.sendStatus(500);
        }

        res.json(team);
    })
})

// delete team assigned to a particular project

router.post('/delete-team-by-project', function(req, res) {
    teams.findOne(req.body, function(err, team) {

        // if team doesn't exist return a response

        if (!team) {
            return res.sendStatus(200);
        }

         // if there is an error return a status 500 response

         if(err) {
            return res.sendStatus(500);
        }

        // remove team with the supplied id from database

        teams.findByIdAndRemove(team._id, function(err, team) {
            // if there is an error return a status 500 response

            if(err) {
                return res.sendStatus(500);
            }

            res.json(team);
        })
    })
})

module.exports = router;