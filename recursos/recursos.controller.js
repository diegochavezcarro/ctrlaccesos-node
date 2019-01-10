const express = require('express');
const router = express.Router();

const WSData = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"[{\\\"Id\\\":1,\\\"ids\\\":[],\\\"RecursoID\\\":1,\\\"Descripcion\\\":\\\"Pileta 1\\\"},{\\\"Id\\\":2,\\\"ids\\\":[],\\\"RecursoID\\\":2,\\\"Descripcion\\\":\\\"Puente\\\"}]\"}";

// routes
router.get('/get', getAll);

module.exports = router;

function getAll(req, res, next) {
    // Para obtener el parametro por QueryString
    // req.query.PuestoControlID
    res.status(200).json(WSData);
}