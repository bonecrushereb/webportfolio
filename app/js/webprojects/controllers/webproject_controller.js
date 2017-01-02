const angular = require('angular');
var baseUrl = require('../../config').baseUrl;
// var imageUrl = '../images/wavebackground.jpg';

module.exports = function(app) {
  app.controller('WebProjectsController', ['$http', 'pResource', 'pStore', '$location',
  function($http, Resource, pStore, $location) {
    this.pStore = pStore;
    this.webprojects = pStore.webprojects;
    this.addWebProject = pStore.addWebProject.bind(pStore);
    this.errors = [];
    this.project = {};
    this.remote = new Resource(this.webprojects, this.errors, baseUrl + '/api/webprojects');

    if ($location.path() === '/') {
      angular.element(document.querySelector('.main'))
          .css({
            background: 'url("../images/wavebackground.jpg") no-repeat center',
            'background-size': 'cover'
          });
    } else {
      angular.element(document.querySelector('.main')).css({ background: '#f6da90' });
    }

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
