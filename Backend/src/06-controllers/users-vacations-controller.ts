import express, { NextFunction, Request, Response } from 'express'
import verifyLoggedIn from '../02-middleware/verify-logged-in'
import FollowModel from '../03-models/follow-model'
import usersVacationsLogic from '../05-logic/users-vacations-logic'
import followLogic from '../05-logic/users-vacations-logic'

const router = express.Router()

// http://localhost:3001/api/user-vacations/013e34b0-355c-45ec-a69d-5290397f13bd
router.get('/user-vacations/:userId',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
  try {
      const userId = request.params.userId
      const userVacations = await followLogic.getAllUserVacationsData(userId)
      response.json(userVacations)
    
  } catch (err: any) {
      next(err)
  }
})


//2 Routes for when a user Follows or Unfollows a vacation:

// http://localhost:3001/api/followers/
router.post('/followers',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log('request.body', request.body)
      const follow = new FollowModel(request.body)
      const addedFollow = await usersVacationsLogic.addFollow(follow)
      response.status(201).json(addedFollow)

  } catch (err: any) {
      next(err)
  }
})

// http://localhost:3001/api/followers/2423432424/3
router.delete('/followers/:userId/:vacationId',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
  try {
     const userId = request.params.userId
     console.log("userId", userId);
     const vacationId = +request.params.vacationId
     console.log("vacationId", vacationId);

     await usersVacationsLogic.deleteFollow(userId, vacationId)
     response.sendStatus(204)


     //!doesnt work making a model out of it !

    //  const followType = {userId, vacationId}
    //  console.log("followType", followType);//followType { userId: '2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', vacationId: 1 }
    //  const unfollow = new FollowModel(followType)
    //  await usersVacationsLogic.deleteFollow(unfollow)
    //  response.sendStatus(204)

  } catch (err: any) {
      next(err)
  }
})

export default router 