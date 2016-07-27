module.exports = function(app) {
  app.directive('gameprojectForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/gameprojects/directives/gameproject_form.html',
      scope: {
        gameproject: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateGameProject,
          create: controller.createGameProject
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
