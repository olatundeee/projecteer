var mongoose = require('mongoose');

var taskDelegationSchema = new mongoose.Schema({
    taskId: String,
    taskTitle: String,
    taskProjectId: String,
    taskDelegatedToId: String,
    taskDelegatedTo: String
})

module.exports = mongoose.model('TaskDelegation', taskDelegationSchema);