const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  author:{ type: String, required: true },
  authorUrl: { type: String, required: true },
  body: { type: String, require: true },
  img: { type: String, required: true }
});

module.exports = exports = mongoose.model('project', projectSchema);
