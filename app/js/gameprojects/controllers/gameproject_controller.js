const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('GameProjectsController', ['pResource', 'pStore', function(Resource, pStore) {
    this.pStore = pStore;
    this.gameprojects = pStore.gameprojects;
    this.addGameProject = pStore.addGameProject.bind(pStore);
    this.errors = [];
    this.remote = new Resource(this.gameprojects, this.errors, baseUrl + '/api/gameprojects');
    this.getAll = this.remote.getAll.bind(this.remote);

    this.createGameProject = function() {
      this.remote.create(this.newGameProject)
        .then(() => {
          this.newGameProject = null;
        });
    }.bind(this);

    this.editGameProject = function(gameproject) {
      gameproject.editing = true;
      this.original = angular.copy(gameproject);
    };

    this.cancelGameProject = function(gameproject) {
      gameproject.editing = false;
      for (var key in this.original) {
        if (this.original.hasOwnProperty(key)) {
          gameproject[key] = this.original[key];
        }
      }
    };

    this.updateGameProject = function(gameproject) {
      this.remote.update(gameproject)
        .then(() => {
          gameproject.editing = false;
        });
    };


    this.removeGameProject = this.remote.remove.bind(this.remote);
  }]);
};
