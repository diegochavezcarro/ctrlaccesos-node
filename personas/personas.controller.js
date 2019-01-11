const express = require('express');
const router = express.Router();

const WSData = "{\"Status\":\"OK\",\"ErrMessage\":null,\"Data\":\"[{\\\"Numero\\\":306980,\\\"Nombre\\\":\\\"GARABELLO BORUS, Luciana Paola\\\",\\\"TipoIngreso\\\":1,\\\"TipoIngresoDesc\\\":\\\"Socio\\\",\\\"Tarjeta\\\":7810056061,\\\"TarjetaEstado\\\":2,\\\"GrupoFamiliar\\\":306561,\\\"FechaNacimiento\\\":\\\"\\\\/Date(162615600000)\\\\/\\\",\\\"NumeroDocumento\\\":24496170,\\\"EstadoSocio\\\":107,\\\"EstadoSocioDesc\\\":\\\"Suspendido\\\",\\\"Categoria\\\":\\\"Activo B\\\"}]\"}";

// routes
router.get('/FindByCriteria', FindByCriteria);

module.exports = router;

function FindByCriteria(req, res, next) {
    res.status(200).json(WSData);
}