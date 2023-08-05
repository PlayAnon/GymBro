const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    users: [],
    messages:[],
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', MatchSchema);