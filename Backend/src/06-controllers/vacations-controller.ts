import express, { NextFunction, Request, Response } from 'express'
import VacationModel from '../03-models/vacation-model'
import vacationsLogic from '../05-logic/vacations-logic'
//!תודיףףףףףףףףףףףףףףףףףףףףףףףףףףףףףףף חסימות תראה עם עובד!! 
import path from 'path'
import verifyAdmin from '../02-middleware/verify-admin'

const router = express.Router()

// http://localhost:3001/api/admin/vacations/
router.get('/vacations',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
      const vacations = await vacationsLogic.getAllVacations()
      response.json(vacations)
    
  } catch (err: any) {
      next(err)
  }
})

// http://localhost:3001/api/admin/vacations/1
router.get('/vacations/:vacationId', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
      const vacationId = +request.params.vacationId
      console.log("vacationId", vacationId);
      const vacation = await vacationsLogic.getOneVacation(vacationId)
      response.json(vacation)

  } catch (err: any) {
      next(err)
  }
})

// http://localhost:3001/api/admin/vacations/
router.post('/vacations',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
      const vacation = new VacationModel(request.body)
      const addedVacation = await vacationsLogic.addVacation(vacation)
      response.status(201).json(addedVacation)

  } catch (err: any) {
      next(err)
  }
})

// http://localhost:3001/api/admin/vacations/4
router.put('/vacations/:vacationId',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationId = +request.params.vacationId
    request.body.vacationId = vacationId 
    const vacation = new VacationModel(request.body)
    const addedVacation = await vacationsLogic.updateVacation(vacation)
    response.json(addedVacation)

  } catch (err: any) {
      next(err)
  }
})

// http://localhost:3001/api/admin/vacations/5
router.delete('/vacations/:vacationId',verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
     const vacationId = +request.params.vacationId
     await vacationsLogic.deleteVacation(vacationId)
     response.sendStatus(204)

  } catch (err: any) {
      next(err)
  }
})

// http://localhost:3001/api/admin/vacations/images/djkfjie3j9dsfsk/
router.get('/vacations/images/:imageName', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const imageName = request.params.imageName
        const absolutePath = path.join(__dirname, '..', 'upload','images', imageName)
        response.sendFile(absolutePath)


  } catch (err: any) {
    next(err)
  }
})



export default router 