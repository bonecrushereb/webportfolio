var errorHandler = require('../../lib').errorHandler;
var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('WebProjectsController', ['$http', function($http) {
    this.webprojects = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/webprojects')
        .then((res) => {
          this.webprojects = res.data;
        }, errorHandler.bind(this));
    };

    this.createWebProject = function() {
      $http.post(baseUrl + '/api/webprojects', this.newWebProject)
        .then((res) => {
          this.webprojects.push(res.data);
          this.newWebProject = null;
        }, errorHandler.bind(this));
    }.bind(this);

    this.updateWebProject = function(webproject) {
      $http.put(baseUrl + '/api/webprojects/' + webproject._id, webproject)
        .then(() => {
          webproject.editing = false;
        }, errorHandler.bind(this));
    };

    this.editWebProject = function(webproject) {
      webproject.editing = true;
      this.backup = copy(webproject);
    };

    this.cancelWebProject = function(webproject) {
      webproject.editing = false;
      for (var key in this.backup) {
        webproject[key] = this.backup[key];
      }
    };

    this.removeWebProject = function(webproject) {
      $http.delete(baseUrl + '/api/webprojects/' + webproject._id)
        .then(() => {
          this.webprojects.splice(this.webprojects.indexOf(webproject), 1);
        }, errorHandler.bind(this));
    }.bind(this);
  }]);
};
