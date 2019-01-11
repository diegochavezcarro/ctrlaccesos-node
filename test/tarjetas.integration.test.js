
const app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;

const dataJSonValidar = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":null}";
const dataJSonRegistrar = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":null}";

describe('Ctrl Accesos API Tests - Tarjetas', function () {
    let token;
    describe('## Validar Ingreso ', function () {
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
                .get('/tarjetas/ValidarIngreso')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/tarjetas/ValidarIngreso')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia obtener los socios', function (done) {
            request(app)
                .get('/tarjetas/ValidarIngreso')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    console.log(`Bearer ${token}`);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('string');
                    expect(res.body).to.eql(dataJSonValidar);
                    done();
                });
        });        
    });

    describe('## Registrar Ingreso ', function () {        
        it('deberia dar error de autenticacion al no pasar token', function (done) {
            request(app)
                .get('/tarjetas/RegistrarIngreso')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/tarjetas/RegistrarIngreso')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia obtener los socios', function (done) {
            request(app)
                .get('/tarjetas/RegistrarIngreso')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    console.log(`Bearer ${token}`);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('string');
                    expect(res.body).to.eql(dataJSonRegistrar);
                    done();
                });
        });        
    });
    this.afterAll(async () => {
        console.log('afterAll');
        app.stop();
    });
});