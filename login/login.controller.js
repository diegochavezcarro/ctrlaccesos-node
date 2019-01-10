
const express = require('express');
const router = express.Router();
const userService = require('../users/user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/EchoPing', EchoPing);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(token) : res.status(403).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function EchoPing(req, res, next) {
    res.status(200).json('OK');
}
