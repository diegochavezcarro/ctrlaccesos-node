const config = require('config');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
{ id: 2, username: 'testa', password: 'testa', firstName: 'Testa', lastName: 'Usera' },
{ id: 3, username: 'agustint', password: 'agustint', firstName: 'Agustin', lastName: 'Tamborelli' },
{ id: 4, username: 'pablon', password: 'pablon', firstName: 'Pablo', lastName: 'Navarro' }];

module.exports = {
    authenticate,
    getAll,
    getToken
};

async function authenticate({ Username, Password }) {
    const user = users.find(u => u.username === Username && u.password === Password);
    if (user) {
        const secret = config.get('secret');
        const token = jwt.sign({ sub: user.id }, secret);
        const { Password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getToken() {
    const secret = config.get('secret');
    const token = jwt.sign({ sub: 1 }, secret);
    return token;
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
