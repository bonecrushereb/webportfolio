module.exports = function(app) {
  require('./contollers')(app);
  require('./directives')(app);
};
