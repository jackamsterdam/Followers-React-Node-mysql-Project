import UserVacationModel from "../Models/UserVacationModel";

export class UserVacationsState {
    userVacations: UserVacationModel[] = []
}

export enum UserVacationsActionType {
    fetchUserVacations="FetchUserVacations"
}

export interface UserVacationsAction {
    type: UserVacationsActionType
    payload: any //?
}

export function fetchUserVacationsAction(userVacations: UserVacationModel[]): UserVacationsAction {
    return {type: UserVacationsActionType.fetchUserVacations, payload: userVacations}
}

export function userVacationsReducer(currentState = new UserVacationsState, action: UserVacationsAction): UserVacationsState {
    const newState = {...currentState}

    switch (action.type) {
        case UserVacationsActionType.fetchUserVacations:
        
        newState.userVacations = action.payload
//???  save to local storge ????
        break;
    }



    return newState
}