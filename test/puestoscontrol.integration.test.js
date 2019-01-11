const app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;

const dataJSon = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"[{\\\"Id\\\":1,\\\"ids\\\":[],\\\"PuestoControlID\\\":1,\\\"Descripcion\\\":\\\"Puesto 1  \\\",\\\"C_USUA\\\":\\\"agustint\\\",\\\"Contraseña\\\":\\\"System.Byte[]\\\",\\\"Contraseña_db\\\":[97,103,117,115,116,105,110,116]}]\"}";

describe('Ctrl Accesos API Tests - Puestos de Control', function () {
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
                .get('/puestoscontrol/get')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/puestoscontrol/get')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia obtener los recursos', function (done) {
            request(app)
                .get('/puestoscontrol/get')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    console.log(`Bearer ${token}`);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('string');
                    expect(res.body).to.eql(dataJSon);
                    done();
                });
        });        
    });
    this.afterAll(async () => {
        console.log('afterAll');
        app.stop();
    });
});