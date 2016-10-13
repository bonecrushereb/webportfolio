const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('WebProjectsController', ['pResource', 'pStore', function(Resource, pStore) {
    this.pStore = pStore;
    this.webprojects = pStore.webprojects;
    this.addWebProject = pStore.addWebProject.bind(pStore);
    this.errors = [];
    this.remote = new Resource(this.webprojects, this.errors, baseUrl + '/api/webprojects');
    this.getAll = this.remote.getAll.bind(this.remote);

    this.createWebProject = function() {
      this.remote.create(this.newWebProject)
        .then(() => {
          this.newWebProject = null;
        });
    }.bind(this);

    this.editWebProject = function(webproject) {
      webproject.editing = true;
      this.original = angular.copy(webproject);
    };

    this.cancelWebProject = function(webproject) {
      webproject.editing = false;
      for (var key in this.original) {
        if (this.original.hasOwnProperty(key)) {
          webproject[key] = this.original[key];
        }
      }
    };

    this.updateWebProject = function(webproject) {
      this.remote.update(webproject)
        .then(() => {
          webproject.editing = false;
        });
    };

    this.removeWebProject = this.remote.remove.bind(this.remote);
  }]);
};
