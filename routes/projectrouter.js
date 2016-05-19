const Router = require('express').Router;
const Project = require(__dirname + '/../models/project');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var projRouter = module.exports = exports = Router();

projRouter.post('/projects', jwtAuth, bodyParser, (req, res) => {
  var newProject = new Project(req.body);
  newProject.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

projRouter.get('/projects', (req, res) => {
  Project.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

projRouter.put('/projects/:id', jwtAuth, bodyParser, (req, res) => {
  var projectData = req.body;
  delete projectData._id;
  Project.update({ _id: req.params.id }, projectData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'update made!' });
  });
});

projRouter.delete('/projects/:id', jwtAuth, (req, res) => {
  Project.remove({ _id: req.params.id }, (err) => {
    if (err) serverErrorHandler(err, res);

    res.status(200).json({ msg: 'project deleted!' });
  });
});
