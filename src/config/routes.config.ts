import { Router, urlencoded, json, static as statik } from 'express'
import cors from 'cors'

export const defaultRouter = () => {
    const router = Router({ mergeParams: true })
    router.use(cors())
    router.use(urlencoded({ extended: true }))
    router.use(json({ limit: '5mb' }))
    router.use(statik('public'))
  
    router.all('/*', (_req, res, next) => {
      res.statusCode = 200
      next()
    })
  
    return router
  }