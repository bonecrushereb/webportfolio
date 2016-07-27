module.exports = function(app) {
  app.factory('pResource', ['$http', 'pHandleError', function($http, pError) {
    var baseUrl = require('../config').baseUrl;
    var Resource = function(resourceArr, errorsArr, baseUrl) {
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errorsArr;
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for (var i = 0; i < res.data.length; i++) {
            this.data.push(res.data[i]);
          }
        }, pError(this.errors, 'could not fetch resource'));
    };

    Resource.prototype.create = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, pError(this.errors, 'could not save resource'));
    };

    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(pError(this.errors, 'could not update resource'));
    };

    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then((res) => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, pError(this.errors, 'could not remove the resource'));
    };

    return Resource;
  }]);
};
