module.exports = function(app) {
  app.directive('webprojectListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/webprojects/directives/webproject_list_item.html',
      scope: {
        webproject: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeWebProject;
        scope.edit = controller.editWebProject;
      }
    };
  });
};
