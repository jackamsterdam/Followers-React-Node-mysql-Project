import axios from 'axios';
import FollowModel from '../Models/FollowModel';
import UserVacationModel from '../Models/UserVacationModel';
import store from '../Redux/Store';
import { addFollowAction, deleteFollowAction, fetchUserVacationsAction } from '../Redux/UserVacationsState';
import config from '../Utils/Config';

class UserVacationsService {

  async getAllUserVacationsData(userId: string): Promise<UserVacationModel[]> {

    const response = await axios.get<UserVacationModel[]>(config.userVacationsUrl + userId)
    const userVacationsData = response.data
    store.dispatch(fetchUserVacationsAction(userVacationsData))
    return userVacationsData

  }

  async addFollow(follow: FollowModel): Promise<FollowModel> {

    const response = await axios.post<FollowModel>(config.followersUrl, follow)
    const addedFollow = response.data
    store.dispatch(addFollowAction(addedFollow))
    return addedFollow
  }

  async deleteFollow(follow: FollowModel): Promise<void> {

    await axios.delete(config.followersUrl + follow.userId + '/' + follow.vacationId)
    store.dispatch(deleteFollowAction(follow))  //both useId and vacationId
  }

}

const userVacationsService = new UserVacationsService()

export default userVacationsService