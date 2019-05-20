var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var taskApplication = require('../models/task-application.js');

// register a new application from logged in user

router.post('/apply-for-task', function(req, res) {
    taskApplication.create(req.body, function(err, taskApplication) {

        // if an error is encountered return a status 500 error

        if(err) {
            res.sendStatus(500);
        }

        res.json(taskApplication)
    })
});

// confirm if currently logged in user has already applied for task before

router.post('/confirm-user-application', function(req, res) {

    // search the task application database to locate document that contains simultaneously the currently logged in user id and task applied for id

    taskApplication.findOne(req.body, function(err, applicant) {
        // if an error is encounter the server will return a 500 status

        if (err) {
            return res.sendStatus(500)
        }

        res.json(applicant);
    })
});

// get all task applicants for a particular task

router.post('/get-task-applicants', function(req, res) {
    // search through the task applicants database and return the list of applicants that match the ask id and title provided

    taskApplication.find(req.body, function(err, applicants) {
        // if an error is encounter the server will return a 500 status

        if (err) {
            return res.sendStatus(500)
        }

        res.json(applicants);
    })
})

// get all applications for a particular specific user

router.post('/get-user-applications', function(req, res) {
    // search through the task applicants database and return the list of applicants that match the ask id and title provided

    const taskApplicantId = req.body.applicantId;

    taskApplication.find({
        taskApplicantId: taskApplicantId
    }, function(err, applications) {
        // if an error is encounter the server will return a 500 status

        if (err) {
            return res.sendStatus(500)
        }

        res.json(applications);
    })
})

module.exports = router;