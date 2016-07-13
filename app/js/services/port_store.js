module.exports = function(app) {
  app.factory('portStore', function() {
    return {
      projects: [],
      badges: [],
      addProject: function(project) {
        this.projects.push(project);
      },
      addBadge: function(badge) {
        this.badges.push(badge);
      }
    };
  });
};
