var mongoose = require('mongoose');

var taskApplicationSchema = new mongoose.Schema({
    taskId: String,
    taskTitle: String,
    taskProjectId: String,
    taskApplicantId: String,
    taskApplicant: String
})

module.exports = mongoose.model('TaskApplication', taskApplicationSchema);