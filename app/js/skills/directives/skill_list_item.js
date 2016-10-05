module.exports = function(app) {
  app.directive('skillListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/skills/directives/skills_list_item.html',
      scope: {
        skill: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeSkill;
        scope.edit = controller.editSkill;
      }
    };
  });
};
