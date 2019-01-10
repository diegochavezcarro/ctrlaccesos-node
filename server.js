require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/personas', require('./personas/personas.controller'));
app.use('/login', require('./login/login.controller'));
app.use('/recursos', require('./recursos/recursos.controller'));
app.use('/puestoscontrol', require('./puestoscontrol/puestoscontrol.controller'));
app.use('/socios', require('./socios/socios.controller'));
app.use('/tarjetas', require('./tarjetas/tarjetas.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
function stop() {
    server.close();
}
module.exports = app;
module.exports.stop = stop;
