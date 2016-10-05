module.exports = function(app) {
  app.factory('pStore', function() {
    return {
      gameprojects: [],
      webprojects: [],
      skills: [],
      addGameProject: function(gameproject) {
        this.gameprojects.push(gameproject);
      },
      addWebProject: function(webproject) {
        this.webprojects.push(webproject);
      },
      addSkill: function(skill) {
        this.skills.push(skill);
      }
    };
  });
};
