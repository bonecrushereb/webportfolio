const mongoose = require('mongoose');

var badgeSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  skill: { type: String, required: true }
});

module.exports = mongoose.model('badge', badgeSchema);
