const app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;

const dataJSon = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"[{\\\"Numero\\\":306980,\\\"Nombre\\\":\\\"GARABELLO BORUS, Luciana Paola\\\",\\\"TipoIngreso\\\":1,\\\"TipoIngresoDesc\\\":\\\"Socio\\\",\\\"Tarjeta\\\":7810056061,\\\"TarjetaEstado\\\":2,\\\"GrupoFamiliar\\\":306561,\\\"FechaNacimiento\\\":\\\"\\\\/Date(162615600000)\\\\/\\\",\\\"NumeroDocumento\\\":24496170,\\\"EstadoSocio\\\":107,\\\"EstadoSocioDesc\\\":\\\"Suspendido\\\",\\\"Categoria\\\":\\\"Activo B\\\"}]\"}";

describe('Ctrl Accesos API Tests - Personas', function () {
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
                .get('/personas/FindByCriteria')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia dar error de autenticacion al pasar token erroneo', function (done) {
            request(app)
                .get('/personas/FindByCriteria')
                .set('Authorization', 'Bearer sarasa')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('Invalid Token');
                    done();
                });
        });
        it('deberia mostrar las personas', function (done) {
            request(app)
                .get('/personas/FindByCriteria')
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