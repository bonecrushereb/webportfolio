module.exports = function(app) {
  app.directive('gameprojectListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/gameprojects/directives/gameproject_list_item.html',
      scope: {
        gameproject: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeGameProject;
        scope.edit = controller.editGameProject;
      }
    };
  });
};
