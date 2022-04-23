import axios from "axios"
import VacationModel from "../Models/VacationModel"
import VictoryFollowModel from "../Models/VictoryFollowModel"
import store from "../Redux/Store"
import { addVacationAction, deleteVacationAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationsState"
import config from "../Utils/Config"

class VacationsService {
  
    async getAllVacations():Promise<VacationModel[]>{
       if (store.getState().vacationsState.vacations.length === 0) {
           const response = await axios.get<VacationModel[]>(config.vacationsAdminUrl)
           const vacations = response.data
           store.dispatch(fetchVacationsAction(vacations))
       }

       return store.getState().vacationsState.vacations
    }

    async getOneVacation(vacationId: number):Promise<VacationModel>{
        let vacation = store.getState().vacationsState.vacations.find(v => v.vacationId === vacationId)
        if (!vacation) {
            const response = await axios.get<VacationModel>(config.vacationsAdminUrl + vacationId)
            vacation = response.data
        }
        
        return vacation
    }

    async addVacation(vacation: VacationModel):Promise<VacationModel> {
       const formData = new FormData() 

       formData.append('destination', vacation.destination)
       formData.append('description', vacation.description)
       formData.append('fromDate', vacation.fromDate)
       formData.append('toDate', vacation.toDate)
       formData.append('price', vacation.price.toString())
       formData.append('star', vacation.star.toString())
       formData.append('rating', '0')
       formData.append('review', '0')
       formData.append('image', vacation.image.item(0))
       console.log("vacation.image.item(0)", vacation.image.item(0));

       const response = await axios.post<VacationModel>(config.vacationsAdminUrl, formData)
       const addedVacation = response.data 
       store.dispatch(addVacationAction(addedVacation))
       return addedVacation

    }

    async  updateVacation(vacation: VacationModel):Promise<VacationModel> {
       const formData = new FormData() 
//!dont foget to send id in compone t!!!!!
       formData.append('destination', vacation.destination)
       formData.append('description', vacation.description)
       formData.append('fromDate', vacation.fromDate)
       formData.append('toDate', vacation.toDate)
       formData.append('price', vacation.price.toString())
       formData.append('star', vacation.star.toString())
       formData.append('rating', vacation.rating.toString())
       formData.append('review', vacation.review.toString())
       formData.append('image', vacation.image.item(0))

       const response = await axios.put<VacationModel>(config.vacationsAdminUrl + vacation.vacationId, formData)
       const updatedVacation = response.data 
       store.dispatch(updateVacationAction(updatedVacation))
       return updatedVacation

    }

    async  deleteVacation(vacationId: number):Promise<void> {
    await axios.delete(config.vacationsAdminUrl + vacationId)
    store.dispatch(deleteVacationAction(vacationId))
    }


    // for Chart: 

    async getAllFollowersForChart():Promise<VictoryFollowModel[]> {
        const response = await axios.get<VictoryFollowModel[]>(config.victoryFollowersCount)
        const followersCount = response.data
        return followersCount
    }
}

const vacationsService = new VacationsService() 

export default vacationsService