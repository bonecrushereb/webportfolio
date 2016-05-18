const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongod://localhost/badge_test_db';
const server = require(__dirname + '/../server');
const Badge = require(__dirname + '/../models/badge');

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
    it('should create a badge', (done) => {
      request('localhost:' + port)
      .post('/api/badges')
      .send({
        title: 'test',
        body: 'I am a test',
        img: 'test.jpg'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.title).to.eql('test');
        expect(res.body.body).to.eql('I am a test');
        expect(res.body.img).to.eql('test.jpg');
        done();
      });
    });
  });

  describe('The GET method', () => {
    it('should get all the badges', (done) => {
      request('localhost:' + port)
      .get('/api/badges')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(0);
        done();
      });
    });
  });

  describe('routes that need badges in the DB', () => {
    beforeEach((done) => {
      var newBadge = new Badge({
        title: 'test',
        body: 'I am a test',
        img: 'test.jpg'
      });
      newBadge.save((err, data) => {
        console.log(err);
        this.badge = data;
        done();
      });
    });
    afterEach((done) => {
      this.badge.remove((err) => {
        console.log(err);
        done();
      });
    });
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should change the badge\'s identity on a put request', (done) => {
      request('localhost:' + port)
      .put('/api/badges/' + this.badge._id)
      .send({
        title: 'test2',
        body: 'I am a test x 2',
        img: 'test2.jpg'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('update made!');
        done();
      });
    });

    it('Should delete a badge on a DELETE request', (done) => {
      request('localhost:' + port)
      .delete('/api/badges/' + this.badge._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('badge has been deleted');
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
