module.exports = function(app) {
  app.directive('webprojectForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/webprojects/directives/webproject_form.html',
      scope: {
        webproject: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, atts, controller) {
        var actions = {
          update: controller.updateWebProject,
          create: controller.createWebProject
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
