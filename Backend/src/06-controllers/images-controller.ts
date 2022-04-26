import express, { NextFunction, Request, Response } from 'express'
import path from 'path'

const router = express.Router()

// http://localhost:3001/vacations/images/djkfjie3j9dsfsk/
router.get('/vacations/images/:imageName', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName
          const absolutePath = path.join(__dirname, '..', 'upload','images', imageName)
          response.sendFile(absolutePath)
  
  
    } catch (err: any) {
      next(err)
    }
  })

export default router 