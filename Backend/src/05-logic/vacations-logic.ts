import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import VacationModel from "../03-models/vacation-model";
import { v4 as uuid } from 'uuid'
import safeDelete from "../01-utils/safe-delete";
import VictoryFollowModel from "../03-models/victory-follow-model";
import path from "path";


async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacations`
    const vacations = await dal.execute(sql)
    return vacations
}


async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT * 
                 FROM vacations
                 WHERE vacationId = ?`

    const vacations = await dal.execute(sql, [vacationId])
    const vacation = vacations[0]
    if (!vacation) throw new ErrorModel(404, `Resource with id ${vacationId} not found.`)
    return vacation
}


async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    //Validation
    const errors = vacation.validatePost()
    if (errors) throw new ErrorModel(400, errors)

    // Handle Images 
    if (vacation.image) {
        //wW want the ext of the image.name property sent from front
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.')) 
        //Now we can create an imageName that will be used to get images by imageName in controller - the controller finds the image on disk by the imageName.
        vacation.imageName = uuid() + extension 
        //We only need to save the imageName with ext in database so we move the image object to the disk and delete it. So mv the image object to the path I give it on the disk.
        await vacation.image.mv(path.join(__dirname, '..', 'upload', 'images', vacation.imageName))
        delete vacation.image
    }
    
    const sql = `INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?, ?,?,?)`
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.star, vacation.rating, vacation.review, vacation.imageName])

    vacation.vacationId = info.insertId
    return vacation
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    //Validation
    const errors = vacation.validatePut()
    if (errors) throw new ErrorModel(400, errors)

    const dbVacation = await getOneVacation(vacation.vacationId)
    //This is to give the vacation the imageName (user does not send imageName he sends only file with picture)
    vacation.imageName = dbVacation.imageName

    if (vacation.image) {
        // we want to delete the old image from disk 
        safeDelete(path.join(__dirname, '..', 'upload', 'images', vacation.imageName))
        //make new imagename
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'))
        vacation.imageName = uuid() + extension
        await vacation.image.mv(path.join(__dirname, '..', 'upload', 'images', vacation.imageName))
        delete vacation.image
    }

    const sql = `UPDATE vacations
                 SET destination = ?, description = ?, fromDate = ?, toDate = ?, price = ? ,star=?, rating= ?, review = ?, imageName = ?
                 WHERE vacationId = ?`

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.star, vacation.rating, vacation.review, vacation.imageName, vacation.vacationId])

    if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${vacation.vacationId} not found`)

    return vacation
}

async function deleteVacation(vacationId: number): Promise<void> {
    // we need to delete image from disk as well: 
    const vacation = await getOneVacation(vacationId)

    safeDelete(path.join(__dirname, '..', 'upload', 'images', vacation.imageName))

    const sql = `DELETE FROM vacations
                  WHERE vacationId = ?`

    const info: OkPacket = await dal.execute(sql, [vacationId])
    if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${vacationId} not found`)
}

// for admin chart: 
async function getAllFollowersForChart(): Promise<VictoryFollowModel[]> {
    const sql = `SELECT  v.destination, COUNT(f.vacationId)  AS vacationCount 
                 FROM followers AS f
                 INNER JOIN vacations AS v  
                 ON v.vacationId = f.vacationId
                 GROUP BY f.vacationId`

    const followerCount = await dal.execute(sql)
    return followerCount
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getAllFollowersForChart
}