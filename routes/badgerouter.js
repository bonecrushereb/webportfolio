const Router = require('express').Router;
const Badge = require(__dirname + '/../models/badge');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var badgeRouter = module.exports = exports = Router();

badgeRouter.post('/badges', jwtAuth, bodyParser, (req, res) => {
  var newBadge = new Badge(req.body);
  newBadge.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

badgeRouter.get('/badges', (req, res) => {
  Badge.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

badgeRouter.put('/badges/:id', jwtAuth, bodyParser, (req, res) => {
  var badgeData = req.body;
  delete badgeData._id;
  Badge.update({ _id: req.params.id }, badgeData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'update made!' });
  });
});

badgeRouter.delete('/badges/:id', jwtAuth, (req, res) => {
  Badge.remove({ _id: req.params.id }, (err) => {
    if (err) serverErrorHandler(err, res);

    res.status(200).json({ msg: 'badge has been deleted' });
  });
});
