import Joi from "joi"

class FollowModel {
    userId: string 
    vacationId: number 

    constructor(follow: FollowModel) {
        this.userId = follow.userId
        this.vacationId = follow.vacationId
    }

    private static postValidationSchema = Joi.object({
        userId: Joi.string().length(36),
        vacationId: Joi.number().required().integer().min(1)      
        
    })

    validatePost():string {
        const result = FollowModel.postValidationSchema.validate(this, {abortEarly: false})
        return result.error?.message
    }
}

export default FollowModel