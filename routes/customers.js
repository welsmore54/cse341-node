const express = require('express')
const router = express.Router()

const contactsController = require('../controllers/customers')

router.get('/', contactsController.getAllData)

router.get('/:id', contactsController.getSingleData)

router.post('/', contactsController.createCustomer)

router.put('/:id', contactsController.updateCustomer)

router.delete('/:id', contactsController.deleteCustomer)

module.exports = router