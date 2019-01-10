const express = require('express');
const router = express.Router();

const WSData = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"[{\\\"Id\\\":1,\\\"ids\\\":[],\\\"PuestoControlID\\\":1,\\\"Descripcion\\\":\\\"Puesto 1  \\\",\\\"C_USUA\\\":\\\"agustint\\\",\\\"Contraseña\\\":\\\"System.Byte[]\\\",\\\"Contraseña_db\\\":[97,103,117,115,116,105,110,116]}]\"}";

// routes
router.get('/get', getAll);

module.exports = router;

function getAll(req, res, next) {    
    res.status(200).json(WSData);
}