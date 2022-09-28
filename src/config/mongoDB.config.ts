import { MongoClient } from 'mongodb'
import { isEmpty } from 'lodash'

import { logger } from '../utils/logger.utils'

const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PWD
} = process.env

let client: any

const getClient = () => client

const getMongoUrl = () =>
  `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`

const collection = (name: string) => {
  return client.collection(name)
}

const connect = async () => {
  if (isEmpty(client)) {
    try {
      const db = MongoClient.connect(getMongoUrl())

      client = (await db).db(MONGODB_DATABASE)
    } catch (err: any) {
      logger.error(err.message)
    }
  }
};

(async () => {
  await connect()
})()

export { connect, collection, getClient, getMongoUrl }
