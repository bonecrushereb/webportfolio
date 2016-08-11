const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BadgesController', ['pResource', 'pStore', function(Resource, pStore) {
    this.pStore = pStore;
    this.badges = pStore.badges;
    this.addBadges = pStore.addBadge.bind(pStore);
    this.errors = [];
    this.remote = new Resource(this.badges, this.errors, baseUrl + '/api/badges');
    this.getAll = this.remote.getAll.bind(this.remote);

    this.createBadge = function() {
      this.remote.create(this.newBadge)
        .then(() => {
          this.newBadge = null;
        });
    }.bind(this);

    this.editBadge = function(badge) {
      badge.editing = true;
      this.original = angular.copy(badge);
    };

    this.cancelBadge = function(badge) {
      badge.editing = false;
      for (var key in this.original) {
        if (this.original.hasOwnProperty(key)) {
          badge[key] = this.original[key];
        }
      }
    };

    this.updateBadge = function(badge) {
      this.remote.update(badge)
        .then(() => {
          badge.editing = false;
        });
    };
    this.removeBadge = this.remote.remove.bind(this.remote);
  }]);
};
