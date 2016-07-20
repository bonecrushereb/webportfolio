const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {

  app.controller('projectsController', ['portResource', 'portStore', function(Resource, portStore) {
    this.portStore = portStore;
    this.projects = portStore.projects;
    this.errors = [];
    this.remote = new Resource(this.projects, this.errors, baseUrl + '/api/projects');
    this.getAll = this.remote.getAll.bind(this.remote);

    this.createProject = function() {
      this.remote.create(this.newProject)
        .then(() => {
          this.newProject = null;
        });
    }.bind(this);

    this.editProject = function(project) {
      project.editing = true;
      this.original = angular.copy(project);
    };

    this.cancelProject = function(project) {
      project.editing = false;
      for (var key in this.original) {
        if(this.original.hasOwnProperty(key)) {
          project[key] = this.original[key];
        }
      }
    };

    this.updateProject = function(project) {
      this.remote.update(project)
        .then(() => {
          project.editing = false;
        });
    };

    this.removeProject = this.remote.remove.bind(this.remote);
  }]);
};
