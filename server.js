const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const webprojectRouter = require(__dirname + '/routes/webprojectrouter');
const gameprojectRouter = require(__dirname + '/routes/gameprojectrouter');
const badgeRouter = require(__dirname + '/routes/badgerouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOD_URI ||
'mongodb://localhost/projectbadge_db');

app.use('/api', webprojectRouter);
app.use('/api', gameprojectRouter);
app.use('/api', badgeRouter);
app.use(express.static(__dirname + '/build'));
app.use((req, res) => {
  res.status(404).send('Error 404 File not found');
});
module.exports = exports = app.listen(PORT, () => console.log('server up on port:' + PORT));
