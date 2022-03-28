import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import UserVacationModel from "../03-models/user-vacation-model";
import FollowModel from "../03-models/follow-model";



async function getAllVacationsWithFollowersCount():Promise<UserVacationModel[]>{
    const sql = `SELECT  v.*, COUNT(f.vacationId) AS followersCount
    FROM vacations AS v
     LEFT JOIN followers as f
     on v.vacationId = f.vacationId
    GROUP BY f.vacationId;`

    const vacationsWithFollowersCount = await dal.execute(sql)
    return vacationsWithFollowersCount

}

async function getAllfollowedVacationsByUser(userId: string):Promise<UserVacationModel[]>{
    const sql = `SELECT vacationId 
    FROM followers 
    WHERE userId = ?;`

    const followedVacations = await dal.execute(sql, [userId])
    return followedVacations

}

async function getAllUsersVacationsExtended(userId: string):Promise<UserVacationModel[]> {
    const allVacationsWithFollowersCount = await getAllVacationsWithFollowersCount()
    const allfollowedVacationsByUser = await getAllfollowedVacationsByUser(userId)

     



    
  return allVacationsWithFollowersCount
//   return allfollowedVacationsByUser
    


}


async function addFollow(follow: FollowModel):Promise<FollowModel> {
    //Validation
     const errors = follow.validatePost()
     if (errors) throw new ErrorModel(400, errors)

    //Prevent unkown user from entering (optional!! check becasue error 500 sql constraint won't let you anwyays.)
    const isExists = await isUserIdExists(follow.userId)
    console.log("isExists", isExists);
    if (!isExists) throw new ErrorModel(400, `UserId does not exist.`)

    // Prevent duplicate entry: (OPTIONAL function- SQL won't let you anyways)
    const isDuplicate = await preventDuplicate(follow.userId, follow.vacationId)
    console.log("isDuplicate", isDuplicate);
    if (isDuplicate) throw new ErrorModel(400, `User is already following that vacation`)

     const sql = `INSERT INTO followers VALUES(?,?)`

     const info: OkPacket = await dal.execute(sql, [follow.userId, follow.vacationId])

     return follow

}

async function deleteFollow(userId: string, vacationId: number):Promise<void> {
    const sql = `DELETE FROM followers
                 WHERE userId = ? AND vacationId = ?`

   const info: OkPacket = await dal.execute(sql, [userId,vacationId])
   if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with userId or vacationId not found`)
}

// doesnt work with followModel: 
// async function deleteFollow(follow: FollowModel):Promise<void> {
//     const sql = `DELETE FROM followers
//                  WHERE userId = ? AND vacatoinId = ?`

//    const info: OkPacket = await dal.execute(sql, [follow.userId, follow.vacationId])
//    if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${follow.userId} not found`)
// }



// 500 errors: (client just wont be able to do it)

// 1. we need to prevent a userId that does not exist from entering data  
async function isUserIdExists(userId: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) as count
                 FROM users
                 WHERE userId = ?`

    const table = await dal.execute(sql, [userId])
    const row = table[0]
    const count = row.count 
    return count > 0
}

// 2. we need to make sure the user doesnt already follow that vacation
// Preventing this error message: 
// ER_DUP_ENTRY: Duplicate entry '2d90f1bc-7c36-411c-96ad-f3a2c9102ca0-1' for key 'PRIMARY'
async function preventDuplicate(userId: string, vacationId: number): Promise<boolean> {
    const sql = `SELECT COUNT(*) as count
                 FROM followers
                 WHERE userId = ? AND vacationId = ?`

    const table = await dal.execute(sql, [userId, vacationId])
    const row = table[0]
    const count = row.count 
    return count > 0
}





export default {

    getAllUsersVacationsExtended,
    addFollow,
    deleteFollow
}