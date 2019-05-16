var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var taskDelegation = require('../models/task-delegation.js');

// delegate task to an applicant

router.post('/delegate-task', function(req, res) {
    taskDelegation.create(req.body, function(err, taskDelegation) {

        // if an error is encountered return a status 500 error

        if(err) {
            res.sendStatus(500);
        }

        res.json(taskDelegation)
    })
}) 


// confirm task delegation for a particular applicant

router.post('/confirm-task-delegation', function(req, res) {
    taskDelegation.findOne(req.body, function(err, taskDelegation) {

        // if an error is encountered return a status 500 error

        if(err) {
            return res.sendStatus(500);
        }

        if(!taskDelegation) {
            return res.json('No delegation yet');
        }

        res.json(taskDelegation)
    })
}) 

module.exports = router;