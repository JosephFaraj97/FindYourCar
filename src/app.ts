import express from 'express'

import { logger } from './utils/logger.utils'
import { authenticationRoutes } from './routes/authentication.routes';
import { adminRoutes } from './routes/admin.routes';
import { defaultRouter } from './config/routes.config';
import { extractJWT } from './middleware/validationJWT';

const app = express();
const port = 3000

require('dotenv').config()
const db = require('./config/mongoDB.config')


app.use('/authentication', authenticationRoutes(defaultRouter(), db))
app.use('/admin', extractJWT ,adminRoutes(defaultRouter(), db))

app.listen(port, () => {
    logger.info(`Server running on port: ${port}`)
})
