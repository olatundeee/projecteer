var mongoose = require('mongoose');

var tasksSchema = new mongoose.Schema({
    project_id: String,
    task_title: String,
    task_description: String,
    task_reason: String,
    task_result: String
})

module.exports = mongoose.model('Tasks', tasksSchema);