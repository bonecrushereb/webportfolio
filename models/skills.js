const mongoose = require('mongoose');

var skillSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  skill: { type: String, required: true }
});

module.exports = mongoose.model('skill', skillSchema);
