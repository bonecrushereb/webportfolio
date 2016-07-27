module.exports = function(app) {
  app.directive('badgeForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/badges/directives/badge_form.html',
      scope: {
        badge: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateBadge,
          create: controller.createBadge
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
