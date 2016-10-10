const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongod://localhost/skill_test_db';
const server = require(__dirname + '/../server');
const Skill = require(__dirname + '/../models/skill');

describe('the server', () => {
  before((done) => {
    server.listen(port, () => {
      done();
    });
  });
  after((done) => {
    server.close(() => {
      done();
    });
  });
  describe('the POST methods', () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
    it('should create a skill', (done) => {
      request('localhost:' + port)
      .post('/api/skills')
      .send({
        title: 'test',
        skill: 'I am a test'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.title).to.eql('test');
        expect(res.body.skill).to.eql('I am a test');
        done();
      });
    });
  });

  describe('The GET method', () => {
    it('should get all the skills', (done) => {
      request('localhost:' + port)
      .get('/api/skills')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(0);
        done();
      });
    });
  });

  describe('routes that need skills in the DB', () => {
    beforeEach((done) => {
      var newSkill = new Skill({
        title: 'test',
        skill: 'I am a test'
      });
      newSkill.save((err, data) => {
        if (err) throw err;
        this.skill = data;
        done();
      });
    });
    afterEach((done) => {
      this.skill.remove((err) => {
        if (err) throw err;
        done();
      });
    });
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should change the skill\'s identity on a put request', (done) => {
      request('localhost:' + port)
      .put('/api/skills/' + this.skill._id)
      .send({
        title: 'test2',
        skill: 'I am a test x 2'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('update made!');
        done();
      });
    });

    it('Should delete a skill on a DELETE request', (done) => {
      request('localhost:' + port)
      .delete('/api/skills/' + this.skill._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('skill has been deleted');
        done();
      });
    });

    describe('server error', () => {
      it('should err on a bad route', (done) => {
        request('localhost:' + port)
        .get('/badroute')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res.text).to.eql('Error 404 File not found');
          done();
        });
      });
    });
  });
});
