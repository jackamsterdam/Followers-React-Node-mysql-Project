import axios  from 'axios';
import FollowModel from '../Models/FollowModel';
import UserVacationModel from '../Models/UserVacationModel';
import store from '../Redux/Store';
import { addFollowAction, deleteFollowAction, fetchUserVacationsAction } from '../Redux/UserVacationsState';
import config from '../Utils/Config';
class UserVacationsService {

    async  getAllUserVacationsData(userId: string):Promise<UserVacationModel[]> {

        //!Should we get from redux instead of from axios if we have it in store and then we display it ??? NOOOO! cause you wont have updated data so we should alays get from DB but actuaylly yes!!!! because we update redux with new data so it is acutlaly updated!! 
        // so do it here like you did in vacationsservice 
  const response = await axios.get<UserVacationModel[]>(config.userVacationsUrl + userId)
  const userVacationsData = response.data
  store.dispatch(fetchUserVacationsAction(userVacationsData))

  return userVacationsData


}


async addFollow(follow: FollowModel):Promise<FollowModel> {


  const response = await axios.post<FollowModel>(config.followersUrl, follow) 
  const addedFollow = response.data 
  console.log("addedFollow  what is here? is this an object with two things??", addedFollow);
  store.dispatch(addFollowAction(addedFollow) )
  return addedFollow
}

//! how to do it this way::???? passing two things to the store ???? payload is usually one thing???
// async deleteFollow(userId: string, vacationId: number):Promise<void> {
//      await axios.delete(config.followersUrl + userId + '/' + vacationId)
//      store.dispatch(deleteFollowAction(userId, vacationId))

// }
async deleteFollow(follow: FollowModel):Promise<void> {
     await axios.delete(config.followersUrl + follow.userId + '/' + follow.vacationId)
     store.dispatch(deleteFollowAction(follow))  //both useId and vacationId

}







}

const userVacationsService = new UserVacationsService()
export default userVacationsService