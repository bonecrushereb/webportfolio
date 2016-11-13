const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SkillsController', ['pResource', 'pStore', function(Resource, pStore) {
    this.pStore = pStore;
    this.skills = pStore.skills;
    this.addSkill = pStore.addSkill.bind(pStore);
    this.errors = [];
    // this.web = [];
    // this.gameArt = [];
    // console.log('web: ', this.web);
    // console.log('gameArt: ', this.gameArt);
    this.remote = new Resource(this.skills, this.errors, baseUrl + '/api/skills');
    this.getAll = this.remote.getAll.bind(this.remote);

    // console.log(this.skills);

    this.createSkill = function() {
      this.remote.create(this.newSkill)
        .then(() => {
          this.newSkill = null;
        });
    }.bind(this);

    this.editSkill = function(skill) {
      skill.editing = true;
      this.original = angular.copy(skill);
    };

    this.cancelSkill = function(skill) {
      skill.editing = false;
      for (var key in this.original) {
        if (this.original.hasOwnProperty(key)) {
          skill[key] = this.original[key];
        }
      }
    };

    this.updateSkill = function(skill) {
      this.remote.update(skill)
        .then(() => {
          skill.editing = false;
        });
    };

    this.removeSkill = this.remote.remove.bind(this.remote);

    // this.splitSkill = function(skills) {
    //   console.log('hello from splitSkill');
    //   var skills = this.newSkill;
    //   for (var i = 0; i < skills.length; i++) {
    //     if (skills[i].career === 'web') {
    //       this.web.push(skills[i]);
    //     } else if (skills[i].career === 'gameArt') {
    //       this.gameArt.push(skills[i]);
    //     }
    //   }
    // };
  }]);
};
