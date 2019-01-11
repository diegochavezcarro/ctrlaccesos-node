
const app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;

const dataJSon = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"{\\\"Numero\\\":107770,\\\"Nombre\\\":\\\"MARCO DEL PONT, Mariana\\\",\\\"TipoIngreso\\\":1,\\\"TipoIngresoDesc\\\":\\\"Socio\\\",\\\"Tarjeta\\\":7810019571,\\\"TarjetaEstado\\\":1,\\\"GrupoFamiliar\\\":0,\\\"FechaNacimiento\\\":\\\"\\\\/Date(-132958800000)\\\\/\\\",\\\"NumeroDocumento\\\":0,\\\"EstadoSocio\\\":101,\\\"EstadoSocioDesc\\\":\\\"Vigente\\\",\\\"Categoria\\\":\\\"Activo A\\\"}\"}";
const dataJSonFoto = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"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\"}";

describe('Ctrl Accesos API Tests - Socios', function () {
    let token;
    describe('## Obtener socios ', function () {
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
                .get('/socios/get')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/socios/get')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia obtener los socios', function (done) {
            request(app)
                .get('/socios/get')
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

    describe('## Obtener foto de socio ', function () {        
        it('deberia dar error de autenticacion al no pasar token', function (done) {
            request(app)
                .get('/socios/GetFoto')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/socios/GetFoto')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia obtener los socios', function (done) {
            request(app)
                .get('/socios/GetFoto')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    console.log(`Bearer ${token}`);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('string');
                    expect(res.body).to.eql(dataJSonFoto);
                    done();
                });
        });        
    });
    this.afterAll(async () => {
        console.log('afterAll');
        app.stop();
    });
});