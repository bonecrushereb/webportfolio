module.exports = function(app) {
  app.directive('projectListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'templates/projects/directives/project_list_item.html',
      scope: {
        project: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeProject;
        scope.edit = controller.editProject;
      }
    };
  });
};
