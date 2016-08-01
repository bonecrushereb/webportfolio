module.exports = function(app) {
  app.factory('pStore', function() {
    return {
      gameprojects: [],
      webprojects: [],
      badges: [],
      addGameProject: function(gameproject) {
        this.gameprojects.push(gameproject);
      },
      addWebProject: function(webproject) {
        this.webprojects.push(webproject);
      },
      addBadge: function(badge) {
        this.badges.push(badge);
      }
    };
  });
};
