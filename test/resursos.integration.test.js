const app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;

const usersWhithoutPassword = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"[{\\\"Id\\\":1,\\\"ids\\\":[],\\\"RecursoID\\\":1,\\\"Descripcion\\\":\\\"Pileta 1\\\"},{\\\"Id\\\":2,\\\"ids\\\":[],\\\"RecursoID\\\":2,\\\"Descripcion\\\":\\\"Puente\\\"}]\"}";

describe('Ctrl Accesos API Tests - Recursos', function () {
    let token;
    describe('## Obtener usuarios ', function () {
        before((done) => {
            request(app)
                .post('/users/authenticate')
                .send({ "username": "test", "password": "test" })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.token).to.not.be.null;
                    token = res.body.token;
                    done();
                });
        });

        it('deberia dar error de autenticacion al no pasar token', function (done) {
            request(app)
                .get('/recursos/get')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/recursos/get')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia mostrar los recursos', function (done) {
            request(app)
                .get('/recursos/get')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    console.log(`Bearer ${token}`);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('string');
                    expect(res.body).to.eql(usersWhithoutPassword);
                    done();
                });
        });        
    });
    this.afterAll(async () => {
        console.log('afterAll');
        app.stop();
    });
});