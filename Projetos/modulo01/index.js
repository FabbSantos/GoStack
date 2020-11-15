const express = require ('express');

const server = express();
server.use(express.json());

// localhost:3000/teste
// query params = ?teste=1
// route params = /users/1
// request body = {"name": "Fabs", "email": "fabriciobs@..."}

const users = ['Fabricio', 'Lucas', 'Bruno'];

server.get('/users', (req, res) => {
    return res.json(users);
})


server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
});

server.post('/users', (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    res.send();
})


server.listen(3000);