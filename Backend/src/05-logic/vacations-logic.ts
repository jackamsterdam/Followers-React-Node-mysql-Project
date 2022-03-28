import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import VacationModel from "../03-models/vacation-model";



async function getAllVacations():Promise<VacationModel[]>{
    const sql = `SELECT * FROM vacations`
    const vacations = await dal.execute(sql)
    return vacations

}

// for put populate: 
async function getOneVacation(vacationId: number):Promise<VacationModel>{
  const sql = `SELECT * 
               FROM vacations
               WHERE vacationId = ?`

 const vacations = await dal.execute(sql, [vacationId])
 console.log("vacations", vacations);
 if (vacations.length === 0) throw new ErrorModel(404, `Resource with id ${vacationId} not found.`)
 const vacation = vacations[0]
 return vacation
               
}


async function addVacation(vacation: VacationModel):Promise<VacationModel> {
    console.log("vacation", vacation);
    //Validation
    const errors = vacation.validatePost()
    if (errors) throw new ErrorModel(400, errors)

    vacation.imageName = '123123'  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DELETE change after 

    const sql = `INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)`
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.imageName])

    vacation.vacationId = info.insertId
    return vacation
}

async function updateVacation(vacation: VacationModel):Promise<VacationModel> {
    //Validation
    const errors = vacation.validatePut()
    if (errors) throw new ErrorModel(400, errors)

    vacation.imageName = '444444444444'  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DELETE change after 


    const sql = `UPDATE vacations
                 SET destination = ?, description = ?, fromDate = ?, toDate = ?, price = ? , pic = ?
                 WHERE vacationId = ?`

    const info: OkPacket =  await dal.execute(sql, [vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.imageName, vacation.vacationId])

   if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${vacation.vacationId} not found`)

   return vacation
}

async function deleteVacation(vacationId: number):Promise<void> {
     const sql = `DELETE FROM vacations
                  WHERE vacationId = ?`

    const info: OkPacket = await dal.execute(sql, [vacationId])
    if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${vacationId} not found`)
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
}