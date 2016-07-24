const angular = require('angular');

const portApp = angular.module('portApp', []);
const baseUrl = 'http://localhost:5555';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

const clone = function(obj) {
  var temp = obj.constructor();
  for (var key in obj) {
    temp[key] = obj[key];
  }
  return temp;
};

portApp.controller('GameProjectsController', ['$http', function($http) {
  this.gameprojects = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/gameprojects', this.newGameProject)
     .then((res) => {
       this.gameprojects = res.data;
     }, handleError.bind(this));
  };

  this.createGameProject = () => {
    $http.post(baseUrl + '/api/gameprojects', this.newGameProject)
      .then((res) => {
        this.gameprojects.push(res.data);
        this.newGameProject = null;
      }, handleError.bind(this));
  };

  this.updateGameProject = (gameproject) => {
    $http.put(baseUrl + '/api/gameprojects/' + gameproject._id, gameproject)
      .then(() => {
        gameproject.editing = false;
      }, handleError.bind(this));
  };

  this.editGameProject = (gameproject) => {
    gameproject.editing = true;
    this.backup = clone(gameproject);
  };

  this.cancelGameProject = (gameproject) => {
    gameproject.editing = false;
    for (var key in this.backup) {
      gameproject[key] = this.backup[key];
    }
  };

  this.removeGameProject = (gameproject) => {
    $http.delete(baseUrl + '/api/gameprojects/' + gameproject._id)
      .then(() => {
        this.gameprojects.splice(this.gameprojects.indexOf(gameproject), 1);
      }, handleError.bind(this));
  };
}]);

portApp.controller('WebProjectsController', ['$http', function($http) {
  this.webprojects = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/webprojects', this.newWebProject)
      .then((res) => {
        this.webprojects = res.data;
      }, handleError.bind(this));
  };

  this.createWebProject = () => {
    $http.post(baseUrl + '/api/webprojects', this.newWebProject)
      .then((res) => {
        this.webprojects.push(res.data);
        this.newWebProject = null;
      }, handleError.bind(this));
  };

  this.updateWebProject = (webproject) => {
    $http.put(baseUrl + '/api/webprojects/' + webproject._id, webproject)
      .then(() => {
        webproject.editing = false;
      }, handleError.bind(this));
  };

  this.editWebProject = (webproject) => {
    webproject.editing = true;
    this.backup = clone(webproject);
  };

  this.cancelWebProject = (webproject) => {
    webproject.editing = false;
    for (var key in this.backup) {
      webproject[key] = this.backup[key];
    }
  };

  this.removeWebProject = (webproject) => {
    $http.delete(baseUrl + '/api/webproject/' + webproject._id)
      .then(() => {
        this.webprojects.splice(this.webprojects.indexOf(webproject), 1);
      }, handleError.bind(this));
  };
}]);

portApp.controller('BadgesController', ['$http', function($http) {
  this.badges = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/badges', this.newBadge)
      .then((res) => {
        this.badges = res.data;
      }, handleError.bind(this));
  };

  this.createBadge = () => {
    $http.post(baseUrl + '/api/badges', this.newBadge)
      .then((res) => {
        this.badges.push(res.data);
        this.newBadge = null;
      }, handleError.bind(this));
  };

  this.updateBadge = (badge) => {
    $http.put(baseUrl + '/api/badges/' + badge._id, badge)
      .then(() => {
        badge.editing = false;
      }, handleError.bind(this));
  };

  this.editBadge = (badge) => {
    badge.editing = true;
    this.backup = clone(badge);
  };

  this.cancelBadge = (badge) => {
    badge.editing = false;
    for (var key in this.backup) {
      badge[key] = this.backup[key];
    }
  };

  this.removeBadge = (badge) => {
    $http.delete(baseUrl + '/api/badges/' + badge._id)
      .then(() => {
        this.badges.splice(this.badges.indexOf(badge), 1);
      }, handleError.bind(this));
  };
}]);
