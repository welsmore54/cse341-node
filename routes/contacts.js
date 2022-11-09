const express = require('express')
const router = express.Router()

const contactsController = require('../controllers/contacts')

router.get('/', contactsController.getAllData)

router.get('/:id', contactsController.getSingleData)

router.post('/', contactsController.createContact)

router.put('/:id', contactsController.updateContact)

router.delete('/:id', contactsController.deleteContact)

module.exports = router