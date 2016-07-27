module.exports = function(app) {
  app.factory('pStore', function() {
    return {
      gameprojects: [],
      webprojects: [],
      badges: [],
      addGameProjects: function(gameproject) {
        this.gameprojects.push(gameproject);
      },
      addWebProjects: function(webproject) {
        this.webprojects.push(webproject);
      },
      addBadge: function(badge) {
        this.badges.push(badge);
      }
    };
  });
};
