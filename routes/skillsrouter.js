const Router = require('express').Router;
const Skill = require(__dirname + '/../models/skills');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var skillsRouter = module.exports = exports = Router();

skillsRouter.post('/skills', bodyParser, (req, res) => {
  var newSkill = new Skill(req.body);
  newSkill.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

skillsRouter.get('/skills', (req, res) => {
  Skill.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

skillsRouter.put('/skills/:id', bodyParser, (req, res) => {
  var skillData = req.body;
  delete skillData._id;
  Skill.update({ _id: req.params.id }, skillData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'update made!' });
  });
});

skillsRouter.delete('/skills/:id', (req, res) => {
  Skill.remove({ _id: req.params.id }, (err) => {
    if (err) serverErrorHandler(err, res);

    res.status(200).json({ msg: 'skill has been deleted' });
  });
});
