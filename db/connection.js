const dotenv = require('dotenv')
dotenv.config()
const {MongoClient} = require('mongodb')

let _data

const initializeDb = (callback) => {
  if (_data) {
    console.log('We\'ve already initialized the database.')
    return callback(null, _data)
  }
  MongoClient.connect(process.env.URI)
    .then((client) => {
      _data = client
      callback(null, _data)
    })
    .catch((err) => {
      callback(err)
    })
}

const getDb = () => {
  if (!_data) {
    throw Error('Database not initialized')
  }
  return _data
}

module.exports = {
  initializeDb,
  getDb,
}