module.exports = function(app) {
  app.directive('projectForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/projects/directives/project_form.html',
      scope: {
        project: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, atts, controller) {
        var actions = {
          update: controller.updateProject,
          create: controller.createProject
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
