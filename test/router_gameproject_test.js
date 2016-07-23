const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/gameproject_test_db';
const server = require(__dirname + '/../server');
const Project = require(__dirname + '/../models/gameproject');

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
  describe('The POST method', () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
    it('should create a game project', (done) => {
      request('localhost:' + port)
      .post('/api/gameprojects')
      .send({
        name: 'project test',
        author: 'tester testerson',
        authorUrl: 'www.tests.com',
        body: 'I like tests',
        img: 'test.jpg'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('project test');
        expect(res.body.author).to.eql('tester testerson');
        expect(res.body.authorUrl).to.eql('www.tests.com');
        expect(res.body.body).to.eql('I like tests');
        expect(res.body.img).to.eql('test.jpg');
        done();
      });
    });
  });

  describe('The GET method', () => {
    it('should get all the projects', (done) => {
      request('localhost:' + port)
      .get('/api/gameprojects')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(0);
        done();
      });
    });
  });

  describe('routes that need projects in the DB', () => {
    beforeEach((done) => {
      var newProject = new Project({
        name: 'project test',
        author: 'tester testerson',
        authorUrl: 'www.tests.com',
        body: 'I like tests',
        img: 'test.jpg'
      });
      newProject.save((err, data) => {
        if (err) console.log(err);
        this.project = data;
        done();
      });
    });
    afterEach((done) => {
      this.project.remove((err) => {
        if (err) console.log(err);
        done();
      });
    });

    it('should chang the project\'s indentity on a PUT request', (done) => {
      request('localhost:' + port)
      .put('/api/gameprojects/' + this.project._id)
      .send({
        name: 'game project test',
        author: 'tester testerson jr',
        authorUrl: 'www.IamTesty.com',
        body: 'I hate the name test',
        img: 'test2.jpg'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('update made!');
        done();
      });
    });

    it('should remove the project on a DELETE request', (done) => {
      request('localhost:' + port)
      .delete('/api/gameprojects/' + this.project._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('game project deleted!');
        done();
      });
    });

    describe('server error', () => {
      it('should error on a bad request', (done) => {
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
