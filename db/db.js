import {MongoClient} from 'mongodb'
import mongoose from 'mongoose'

const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
  } = process.env


const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
let connection


async function ConnectDB () {
    if (connection) return connection
  
    let client
    try {
        mongoose.connect(mongoUrl);
        connection   = mongoose.connection
    } catch (error) {
      console.error('Could not connect to db', mongoUrl, error)
      process.exit(1)
    }
  
    return connection
  }
  
  export default ConnectDB;
  