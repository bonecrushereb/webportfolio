module.exports = function(app) {
  require('./p_handle_error')(app);
  require('./p_resource')(app);
  require('./p_store')(app);
};
