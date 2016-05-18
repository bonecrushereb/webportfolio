const mongoose = require('mongoose');

var badgeSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  body: { type: String, required: true },
  img: { type: String, required: true }
});

module.exports = mongoose.model('badge', badgeSchema);
