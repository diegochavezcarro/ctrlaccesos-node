const app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;

// const usersWhithoutPassword = [{ id: 1, username: 'test', firstName: 'Test', lastName: 'User' },
// { id: 2, username: 'agustint', firstName: 'agustint', lastName: 'Usera' }];

const usersWhithoutPassword = [{ id: 1, username: 'test', firstName: 'Test', lastName: 'User' },
{ id: 2, username: 'testa', firstName: 'Testa', lastName: 'Usera' },
{ id: 3, username: 'agustint', firstName: 'Agustin', lastName: 'Tamborelli' },
{ id: 4, username: 'pablon', firstName: 'Pablo', lastName: 'Navarro' }];

describe('Ctrl Accesos API Tests', function () {
    let token;
    describe('## Obtener usuarios ', function () {
        before((done) => {
            request(app)
                .post('/users/authenticate')
                .send({ "Username": "test", "Password": "test" })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.token).to.not.be.null;
                    token = res.body.token;
                    done();
                });
        });

        it('deberia dar error de autenticacion al no pasar token', function (done) {
            request(app)
                .get('/users')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/users')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia mostrar los usuarios', function (done) {
            request(app)
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    console.log(`Bearer ${token}`);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.eql(usersWhithoutPassword);
                    done();
                });
        });
        it('deberia mostrar los usuarios para otro login', function (done) {
            let token2;
            request(app)
                .post('/users/authenticate')
                .send({ "Username": "testa", "Password": "testa" })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.token).to.not.be.null;
                    token2 = res.body.token;
                    request(app)
                        .get('/users')
                        .set('Authorization', `Bearer ${token2}`)
                        .end(function (err, res) {
                            console.log(`Bearer ${token2}`);
                            expect(res.statusCode).to.equal(200);
                            expect(res.body).to.eql(usersWhithoutPassword);
                            done();
                        });
                });

        });
    });
    describe('## Autenticate ', function () {
        it('deberia devolver un token', function (done) {
            request(app)
                .post('/users/authenticate')
                .send({ "Username": "test", "Password": "test" })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.token).to.not.be.null;
                    done();
                });
        });
        it('deberia devolver error 403 login invalido', function (done) {
            request(app)
                .post('/users/authenticate')
                .send({ "Username": "tes", "Password": "test" })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(403);
                    expect(res.body.message).to.equal('Username or password is incorrect');
                    done();
                });
        });
    });
    this.afterAll(async () => {
        console.log('afterAll');
        app.stop();
    });

    /*
      describe('## Create task ', function() {
        it('should create a task', function(done) {
          request(app)
            .post('/tasks')
            .send(task)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal('integration test');
              task = res.body;
              done();
            });
        });
      });
    
      describe('# Get all tasks', function() {
        it('should get all tasks', function(done) {
          request(app)
            .get('/tasks')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('array');
              done();
            });
        });
      });
      describe('Get a task by id', function() {
        it('should get a task', function(done) {
          request(app)
            .get('/tasks/' + task._id)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.name).to.equal('integration test');
              done();
            });
        });
      });
    
      describe('Update a task by id', function() {
        it('should modify a task', function(done) {
          task.name = 'New Task'
          request(app)
            .put('/tasks/' + task._id)
            .send(task)
            .end(function(err, res) {
              expect(res.body.name).to.equal('New Task');
              expect(res.statusCode).to.equal(200);
              done();
            });
        });
      });
      describe('Delete a task by id', function() {
        it('should delete a task', function(done) {
          request(app)
            .delete('/tasks/' + task._id)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body.message).to.equal('Task successfully deleted');
              done();
            });
        });
      });*/
});