const mongoose = require('mongoose');

var skillSchema = new mongoose.Schema({
  career: { type: String, required: true },
  skill: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('skill', skillSchema);
