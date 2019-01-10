const express = require('express');
const router = express.Router();

const WSDataValidOK = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":null}";
const WSDataValidError = "{\"Status\":\"Error\",\"ErrMessage\":\"Socio inexistente\",\"Data\":null}";
const WSDataRegistroOK = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":null}";
const WSDataRegistroError = "{\"Status\":\"Error\",\"ErrMessage\":\"Acceso inhabilitado\",\"Data\":null}";

// routes
router.get('/ValidarIngreso', ValidarIngreso);
router.get('/RegistrarIngreso', RegistrarIngreso);

module.exports = router;

function ValidarIngreso(req, res, next) {
    const tarjeta = req.query.tarjeta;

    if(tarjeta != 100000000)
        res.status(200).json(WSDataValidOK);
    else
        res.status(200).json(WSDataValidError);
}

function RegistrarIngreso(req, res, next) {
    const tarjeta = req.query.tarjeta;

    if(tarjeta != 100000000)
        res.status(200).json(WSDataRegistroOK);
    else
        res.status(200).json(WSDataRegistroError);
}