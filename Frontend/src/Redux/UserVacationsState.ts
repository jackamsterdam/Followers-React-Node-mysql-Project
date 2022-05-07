import FollowModel from "../Models/FollowModel";
import UserVacationModel from "../Models/UserVacationModel";

export class UserVacationsState {
    userVacations: UserVacationModel[] = []
}

export enum UserVacationsActionType {

    fetchUserVacations = "FetchUserVacations",

    addFollow = "AddFollow",
    deleteFollow = "DeleteFollow",

}

export interface UserVacationsAction {
    type: UserVacationsActionType
    payload: any
}

export function fetchUserVacationsAction(userVacations: UserVacationModel[]): UserVacationsAction {
    return { type: UserVacationsActionType.fetchUserVacations, payload: userVacations }
}

export function addFollowAction(follow: FollowModel): UserVacationsAction {
    return { type: UserVacationsActionType.addFollow, payload: follow }
}

export function deleteFollowAction(unFollow: FollowModel): UserVacationsAction {
    return { type: UserVacationsActionType.deleteFollow, payload: unFollow }
}

export function userVacationsReducer(currentState = new UserVacationsState, action: UserVacationsAction): UserVacationsState {
    const newState = { ...currentState }

    switch (action.type) {
        case UserVacationsActionType.fetchUserVacations:

            newState.userVacations = action.payload

        break;

        case UserVacationsActionType.addFollow:

            const toBeFollowed = newState.userVacations.find(f => f.vacationId === action.payload.vacationId)

            toBeFollowed.isFollowing = true
            toBeFollowed.followersCount++

        break;

        case UserVacationsActionType.deleteFollow:
            
            const toBeUnFollowed = newState.userVacations.find(f => f.vacationId === action.payload.vacationId)
            toBeUnFollowed.isFollowing = false
            toBeUnFollowed.followersCount--

         break;
    }

    return newState
}