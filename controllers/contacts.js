const mongodb = require('../db/connection')
const {ObjectId} = require('mongodb')

const getAllData = async (req, res, next) => {
  const output = await mongodb.getDb().db().collection('contacts').find()
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

module.exports = { getAllData, getSingleData }