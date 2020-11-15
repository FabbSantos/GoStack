const express = require ('express');

const server = express();

// localhost:3000/teste
// query params = ?teste=1
// route params = /users/1
// request body = {"name": "Fabs", "email": "fabriciobs@..."}

const users = ['Fabricio', 'Lucas', 'Bruno'];

server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
});


server.listen(3000);