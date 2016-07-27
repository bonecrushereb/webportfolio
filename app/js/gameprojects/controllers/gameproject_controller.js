var errorHandler = require('../../lib').errorHandler;
var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('GameProjectsController', ['$http', function($http) {
    this.gameprojects = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/gameprojects')
       .then((res) => {
         this.gameprojects = res.data;
       }, errorHandler.bind(this));
    };

    this.createGameProject = function() {
      $http.post(baseUrl + '/api/gameprojects', this.newGameProject)
        .then((res) => {
          this.gameprojects.push(res.data);
          this.newGameProject = null;
        }, errorHandler.bind(this));
    }.bind(this);

    this.updateGameProject = function(gameproject) {
      $http.put(baseUrl + '/api/gameprojects/' + gameproject._id, gameproject)
        .then(() => {
          gameproject.editing = false;
        }, errorHandler.bind(this));
    };

    this.editGameProject = function(gameproject) {
      gameproject.editing = true;
      this.backup = copy(gameproject);
    };

    this.cancelGameProject = function(gameproject) {
      gameproject.editing = false;
      for (var key in this.backup) {
        gameproject[key] = this.backup[key];
      }
    };

    this.removeGameProject = function(gameproject) {
      $http.delete(baseUrl + '/api/gameprojects/' + gameproject._id)
        .then(() => {
          this.gameprojects.splice(this.gameprojects.indexOf(gameproject), 1);
        }, errorHandler.bind(this));
    }.bind(this);
  }]);
};
