const mongoose = require('mongoose');

var gameprojectSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  img: { type: String, required: true },
  techused: { type: String, required: true }
});

module.exports = exports = mongoose.model('gameproject', gameprojectSchema);
