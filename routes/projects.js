var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var projects = require('../models/projects.js');

// get all projects

router.get('/all-projects', function(req, res, next) {
    projects.find({}, function(err, projects) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(projects)
    })
})

// get all projects associated with one particular user

router.post('/all-user-projects', function(req, res, next) {
    // look through the database for documents containing a matching user id

    projects.find({
        project_lead: req.body.userId
    }, function(err, projects) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(projects)
    })
})

// get one project

router.post('/one-project', function(req, res) {
    projects.findById(req.body.id, function(err, project) {
        if (err) {
            return res.sendStatus(500)
        }

        res.json(project);
    })
})

// add new project

router.post('/add-new-project', function(req, res) {
    //console.log(req.body);
    projects.create({
        project_name: req.body.project_name,
        project_problems: req.body.project_problems,
        project_solutions: req.body.project_solutions,
        project_description: req.body.project_description,
        project_lead: req.body.project_lead
    }, function(err, project) {
        if(err) {
            console.log(err);
        }

        res.json(project)
    })
})

// update project

router.post('/update-project', function(req, res) {
    console.log(req.body);

    projects.findByIdAndUpdate(req.body.project.id, {
        project_name: req.body.project.projectname,
        project_description: req.body.project.projectdescription,
        project_problems: req.body.project.projectproblems,
        project_solutions: req.body.project.projectsolution,
        project_lead: req.body.project_lead
    }, function(err, project) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(project);
    })
})

// delete project

router.post('/remove-project', function(req, res) {
    projects.findByIdAndRemove(req.body.id, function(err, project) {
        if(err) {
            return res.sendStatus(500);
        }

        res.json(project);
    })
})

module.exports = router;