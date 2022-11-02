const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Dafne Elsmore')
})

module.exports = routes;