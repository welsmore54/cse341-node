const mongodb = require('../db/connection')
const {ObjectId} = require('mongodb')

const getAllData = async (req, res, next) => {
  const output = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find()
  output.toArray().then((list) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(list)
  })
}

const getSingleData = async (req, res, next) => {
  const userId = new ObjectId(req.params.id)
  const output = await mongodb
    .getDb() 
    .db()
    .collection('contacts')
    .find({ _id: userId })
  output.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists[0])
  })
}

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const output = await mongodb.getDb().db().collection('contacts').insertOne(contact)
  res.status(201).json(output);
}

const updateContact = async (req,res) => {
  const userId = new ObjectId(req.params.id)
  const input = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
  }
  const output = await mongodb
    .getDb() 
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, input)

  if (output.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(output.error || 'There was an error when updating this contact')
  }
}

const deleteContact = async (req,res) => {
  const userId = new ObjectId(req.params.id)
  const output = await mongodb
    .getDb() 
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId }, true)
  res.status(204).send()
}

module.exports = { getAllData, getSingleData, createContact, updateContact, deleteContact }