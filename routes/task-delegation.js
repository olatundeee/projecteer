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

// find and remove delegation for a particular task

router.post('/find-and-remove-task-delegation', function(req, res) {
    taskDelegation.findOne(req.body, function(err, taskdelegation) {

        // if an error is encountered return a status 500 error

        if(err) {
            return res.sendStatus(500);
        }

        if(!taskdelegation) {
            return res.json('No delegation yet');
        }

        if(taskdelegation) {
            taskDelegation.findByIdAndRemove(taskdelegation._id, function(err, delegation) {
                // if an error is encountered return a status 500 error

                if(err) {
                    return res.sendStatus(500);
                }

                res.json(delegation)
            })
        }
    })
}) 

// find details about a particular task delegation

router.post('/find-task-delegation', function(req, res) {
    taskDelegation.findOne(req.body, function(err, taskDelegation) {

        // if an error is encountered return a status 500 error

        if(err) {
            return res.sendStatus(500);
        }

        if(!taskDelegation) {
            return res.json('No delegation yet');
        }

        res.json(taskDelegation.taskDelegatedTo)
    })
})

// find details about a particular task delegation

router.post('/get-user-delegations', function(req, res) {
    taskDelegation.find(req.body, function(err, taskDelegations) {

        // if an error is encountered return a status 500 error

        if(err) {
            return res.sendStatus(500);
        }

        res.json(taskDelegations)
    })
})

module.exports = router;