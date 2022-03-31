class FollowModel {
    userId: string 
    vacationId: number
  //!right??? i dont need  a copy conructor this is just for the delte so i can use it 
    constructor(userId: string, vacationId: number) {
        this.userId = userId
        this.vacationId = vacationId
    }
}

export default FollowModel