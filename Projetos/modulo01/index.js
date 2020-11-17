const express = require ('express');

const server = express();
server.use(express.json());

// localhost:3000/teste
// query params = ?teste=1
// route params = /users/1
// request body = {"name": "Fabs", "email": "fabriciobs@..."}

const users = ['Fabricio', 'Lucas', 'Bruno'];

server.use((req, res, next) => {            //Middleware global
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    
    next();
    console.timeEnd('Request');
})


function checkUserExists(req, res, next) {      //função para verificação de erro de nome de user
    if (!req.body.user) {
        return res.status(400).json({ error: 'User name required' });
    }

    return next();
}

function checkUserInArray(req, res, next) {      //função para verificação de erro de index
    const user = users[req.params.index];  
    
    if (!user) {
        return res.status(400).json({ error: 'User does not exists' });
    }

    req.user = user;

    return next();
}


server.get('/users', (req, res) => {
    return res.json(users);
})


server.get('/users/:index', checkUserInArray, (req, res) => {

    return res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    res.send();
})


server.listen(3000);