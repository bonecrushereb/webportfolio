module.exports = function(app) {
  app.directive('badgeListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'templateUrl/badges/directives/badge_list_item.html',
      scope: {
        badge: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeBadge;
        scope.edit = controller.editBadge;
      }
    };
  });
};
