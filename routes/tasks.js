var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var tasks = require('../models/tasks.js');

// get all tasks

router.get('/all-tasks', function(req, res, next) {
    tasks.find({}, function(err, tasks) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(tasks)
    })
})

// get one task

router.post('/one-task', function(req, res) {
    tasks.findById(req.body.id, function(err, task) {
        if (err) {
            return res.sendStatus(500)
        }

        res.json(task);
    })
})

// get all tasks added by one user

router.post('/get-all-user-task', function(req, res) {
    tasks.find({
        task_added_by_id: req.body.userId,
        task_added_by: req.body.currentUser
    }, function(err, task) {
        if (err) {
            return res.sendStatus(500)
        }

        res.json(task);
    })
})

// add new task

router.post('/add-new-task', function(req, res) {
    tasks.create(req.body, function(err, task) {
        if(err) {
            res.sendStatus(500);
        }

        res.json(task)
    })
})

// update task

router.post('/update-task', function(req, res) {
    tasks.findByIdAndUpdate(req.body.id, req.body.task, function(err, task) {
        if(err) {
            console.log(err)
            return res.sendStatus(500);
        }

        res.json(task);
    })
})

// delete task

router.post('/remove-task', function(req, res) {
    tasks.findByIdAndRemove(req.body.id, function(err, task) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(task);
    })
})


// delete all  tasks associated with the received project id

router.post('/delete-project-tasks', function(req, res) {
    console.log(req.body);

    // look for the matching tasks in the tasks db and delete all of them 
    tasks.remove({
        project_id: req.body.projectId
    }, function(err, task) {
        // if an error is encountered return 500 status 

        if(err) {
            return res.sendStatus(500);
        }

        // upon successful deletion return json object

        res.json(task);
    })
})

module.exports = router;