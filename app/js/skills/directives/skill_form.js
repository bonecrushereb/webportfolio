module.exports = function(app) {
  app.directive('skillForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/skills/directives/skill_form.html',
      scope: {
        skill: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateSkill,
          create: controller.createSkill
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
