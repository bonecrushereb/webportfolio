const mongoose = require('mongoose');

var gameprojectSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  author: { type: String },
  body: { type: String },
  img: { type: String, required: true },
  techused: { type: String }
});

module.exports = exports = mongoose.model('gameproject', gameprojectSchema);
