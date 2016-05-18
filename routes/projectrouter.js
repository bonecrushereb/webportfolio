const Router = require('express').Router;
const Project = require(__dirname + '/../models/project');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var projRouter = module.exports = exports = Router();

projRouter.post('/projects', bodyParser, (req, res) => {
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

projRouter.put('/projects/:id', bodyParser, (req, res) => {
  var projectData = req.body;
  delete projectData._id;
  Project.update({ _id: req.params.id }, projectData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'update made!' });
  });
});

projRouter.delete('/projects/:id', (req, res) => {
  Project.remove({ _id: req.params.id }, (err) => {
    if (err) serverErrorHandler(err, res);

    res.status(200).json({ msg: 'project deleted!' });
  });
});
