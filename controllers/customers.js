const mongodb = require('../db/connection')
const {ObjectId} = require('mongodb')

const getAllData = async (req, res, next) => {
  const output = await mongodb
    .getDb()
    .db()
    .collection('Personal_Project')
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
    .collection('Personal_Project')
    .find({ _id: userId })
  output.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists[0])
  })
}

const createCustomer = async (req, res) => {
  const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      date_of_birth: req.body.date_of_birth,
      password: req.body.password,
      address: req.body.address,
      gender: req.body.gender
  }
  const output = await mongodb
  .getDb()
  .db()
  .collection('Personal_Project')
  .insertOne(contact)
  res.status(201).json(output);
}

const updateCustomer = async (req,res) => {
  const userId = new ObjectId(req.params.id)
  const input = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      date_of_birth: req.body.date_of_birth,
      password: req.body.password,
      address: req.body.address,
      gender: req.body.gender
  }
  const output = await mongodb
    .getDb() 
    .db()
    .collection('Personal_Project')
    .replaceOne({ _id: userId }, input)
    res.status(204).send()
}

const deleteCustomer = async (req,res) => {
  const userId = new ObjectId(req.params.id)
  const output = await mongodb
    .getDb() 
    .db()
    .collection('Personal_Project')
    .deleteOne({ _id: userId }, true)
  res.status(200).send()
}

module.exports = { getAllData, getSingleData, createCustomer, updateCustomer, deleteCustomer }