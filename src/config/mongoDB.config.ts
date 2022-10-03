import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
import { isEmpty } from 'lodash'

import { logger } from '../utils/logger.utils'

const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PWD
} = process.env

const getMongoUrl = () =>
  `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`


const connect = async () => {
    try {
      mongoose.connect(getMongoUrl())
    } catch (err: any) {
      logger.error(err.message)
    }
};

(async () => {
  await connect()
})()

export { connect, getMongoUrl }
