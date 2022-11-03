const express = require('express')
const routes = require('express').Router();

routes.use('/contacts', require('./contacts'))

routes.get('/', (req,res) => {
    res.send('Dafne Elsmore')
})

module.exports = routes;