const mongoose = require('mongoose');

var webprojectSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  author: { type: String },
  authorUrl: { type: String },
  body: { type: String, required: true },
  img: { type: String, required: true },
  techused: { type: String }

});

module.exports = exports = mongoose.model('Webproject', webprojectSchema);
