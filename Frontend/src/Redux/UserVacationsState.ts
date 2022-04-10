import FollowModel from "../Models/FollowModel";
import UserVacationModel from "../Models/UserVacationModel";

export class UserVacationsState {
    userVacations: UserVacationModel[] = []
}
//!!!!dont Add local storage

export enum UserVacationsActionType {

    fetchUserVacations="FetchUserVacations",

    addFollow = "AddFollow",
    deleteFollow = "DeleteFollow",

    // socketSend = "socketSend"
}

export interface UserVacationsAction {
    type: UserVacationsActionType
    payload: any 
}

export function fetchUserVacationsAction(userVacations: UserVacationModel[]): UserVacationsAction {
    return {type: UserVacationsActionType.fetchUserVacations, payload: userVacations}
}


export function addFollowAction(follow: FollowModel): UserVacationsAction {
    return {type: UserVacationsActionType.addFollow, payload: follow }
}

export function deleteFollowAction(unFollow: FollowModel): UserVacationsAction {
    return {type: UserVacationsActionType.deleteFollow, payload: unFollow}
}

// export function socketSendAction(userVacations: UserVacationModel[]): UserVacationsAction {
//     return {type: UserVacationsActionType.socketSend, payload: userVacations}
// }



export function userVacationsReducer(currentState = new UserVacationsState, action: UserVacationsAction): UserVacationsState {
    const newState = {...currentState}

    switch (action.type) {
        case UserVacationsActionType.fetchUserVacations:
        // case UserVacationsActionType.socketSend:
        
        newState.userVacations = action.payload
//???  save to local storge ????
        break;

        case UserVacationsActionType.addFollow:

        const toBeFollowed = newState.userVacations.find(f => f.vacationId === action.payload.vacationId)

        //toBeFollowed is a reference pointing to same object so if you change it here it will change the original

        toBeFollowed.isFollowing = true 
        toBeFollowed.followersCount++

        // no need for this line: its actually bad becuase it adds another one lol 
        // newState.userVacations = [...newState.userVacations, toBeFollowed]

        // const indexToUpdateForFollow = newState.userVacations.findIndex(f => f.vacationId === toBeFollowed.vacationId)
        // newState.userVacations[indexToUpdateForFollow] = toBeFollowed

        break;
        case UserVacationsActionType.deleteFollow:
            const toBeUnFollowed = newState.userVacations.find(f => f.vacationId === action.payload.vacationId)
            toBeUnFollowed.isFollowing = false 
            toBeUnFollowed.followersCount--

            // const indexToUpdateForUnfollow = newState.userVacations.findIndex(f => f.vacationId === toBeUnFollowed.vacationId)
            // newState.userVacations[indexToUpdateForUnfollow] = toBeUnFollowed

        break;
    }



    return newState
}