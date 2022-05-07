import express, { NextFunction, Request, Response } from 'express'
import VacationModel from '../03-models/vacation-model'
import vacationsLogic from '../05-logic/vacations-logic'
import verifyAdmin from '../02-middleware/verify-admin'
import socketLogic from '../05-logic/socket-logic'

const router = express.Router()

// http://localhost:3001/api/admin/vacations/
router.get('/vacations', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

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
    const vacation = await vacationsLogic.getOneVacation(vacationId)
    response.json(vacation)

  } catch (err: any) {
    next(err)
  }
})

// http://localhost:3001/api/admin/vacations/
router.post('/vacations', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

  try {

    request.body.image = request.files?.image
    const vacation = new VacationModel(request.body)
    const addedVacation = await vacationsLogic.addVacation(vacation)
    
    socketLogic.updateAll()

    response.status(201).json(addedVacation)

  } catch (err: any) {
    next(err)
  }
})

// http://localhost:3001/api/admin/vacations/4
router.put('/vacations/:vacationId', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

  try {

    request.body.image = request.files?.image
    const vacationId = +request.params.vacationId
    request.body.vacationId = vacationId
    const vacation = new VacationModel(request.body)
    const updatedVacation = await vacationsLogic.updateVacation(vacation)

    socketLogic.updateAll()

    response.json(updatedVacation)
    
  } catch (err: any) {
    next(err)
  }
})

// http://localhost:3001/api/admin/vacations/5
router.delete('/vacations/:vacationId', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

  try {

    const vacationId = +request.params.vacationId
    await vacationsLogic.deleteVacation(vacationId)

    socketLogic.updateAll()

    response.sendStatus(204)

  } catch (err: any) {
    next(err)
  }
})


// For Chart 
// http://localhost:3001/api/admin/followers-count/
router.get('/followers-count', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

  try {

    const followerCount = await vacationsLogic.getAllFollowersForChart()
    response.json(followerCount)

  } catch (err: any) {
    next(err)
  }
})

export default router 