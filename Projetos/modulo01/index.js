const express = require ('express');

const server = express();

// localhost:3000/teste
// query params = ?teste=1
// route params = /users/1
// request body = {"name": "Fabs", "email": "fabriciobs@..."}

server.get('/teste', (req, res) => {
    const nome = req.query.nome;

    return res.json({ "message": `Hello ${nome}`});
});


server.listen(3000);