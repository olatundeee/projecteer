var mongoose = require('mongoose');

var projectsSchema = new mongoose.Schema({
    project_name: String,
    project_description: String,
    project_problems: String,
    project_solutions: String,
    project_lead: String
})

module.exports = mongoose.model('Projects', projectsSchema);