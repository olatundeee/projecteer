var mongoose = require('mongoose');

var teamsSchema = new mongoose.Schema({
    team_name: String,
    team_project: String,
    team_lead: String,
    team_lead_id: String,
    team_description: String,
    team_projectId: String,
    team_isCreated: String
})

module.exports = mongoose.model('Teams', teamsSchema);