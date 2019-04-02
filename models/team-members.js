var mongoose = require('mongoose');

var TeamMembersSchema = new mongoose.Schema({
    currentUser: String,
    currentUserId: String,
    currentTeam: String,
    currentTeamId: String,
    currentProject: String,
    currentProjectId: String
})

module.exports = mongoose.model('TeamMembers', TeamMembersSchema);