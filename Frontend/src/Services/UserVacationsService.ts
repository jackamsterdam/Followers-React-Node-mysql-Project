import axios  from 'axios';
import UserVacationModel from '../Models/UserVacationModel';
import store from '../Redux/Store';
import { fetchUserVacationsAction } from '../Redux/UserVacationsState';
import config from '../Utils/Config';
class UserVacationsService {

    async  getAllUserVacationsData(userId: string):Promise<UserVacationModel[]> {

        //!Should we get from redux instead of from axios if we have it in store and then we display it ??? NOOOO! cause you wont have updated data so we should alays get from DB but actuaylly yes!!!! because we update redux with new data so it is acutlaly updated!! 
  const response = await axios.get<UserVacationModel[]>(config.userVacationsUrl + userId)
  const userVacationsData = response.data
  store.dispatch(fetchUserVacationsAction(userVacationsData))

  return userVacationsData


}









}

const userVacationsService = new UserVacationsService()
export default userVacationsService