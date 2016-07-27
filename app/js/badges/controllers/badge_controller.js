var errorHandler = require('../../lib').errorHandler;
var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('BadgesController', ['$http', function($http) {
    this.badges = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/badges')
        .then((res) => {
          this.badges = res.data;
        }, errorHandler.bind(this));
    };

    this.createBadge = function() {
      $http.post(baseUrl + '/api/badges', this.newBadge)
        .then((res) => {
          this.badges.push(res.data);
          this.newBadge = null;
        }, errorHandler.bind(this));
    }.bind(this);

    this.updateBadge = function(badge) {
      $http.put(baseUrl + '/api/badges/' + badge._id, badge)
        .then(() => {
          badge.editing = false;
        }, errorHandler.bind(this));
    };

    this.editBadge = function(badge) {
      badge.editing = true;
      this.backup = copy(badge);
    }.bind(this);

    this.cancelBadge = function(badge) {
      badge.editing = false;
      for (var key in this.backup) {
        badge[key] = this.backup[key];
      }
    };

    this.removeBadge = function(badge) {
      $http.delete(baseUrl + '/api/badges/' + badge._id)
        .then(() => {
          this.badges.splice(this.badges.indexOf(badge), 1);
        }, errorHandler.bind(this));
    }.bind(this);
  }]);
};
