import Joi from 'joi';
import { UploadedFile } from "express-fileupload"

//This parent class will be used with userVacationModel extended
//This parent class is used by Admin for vacations and when user follows or unfollows a vacation
class VacationModel {
    vacationId: number
    destination: string
    description: string
    fromDate: string
    toDate: string
    price: number
    star: number
    rating: number
    review: number
    image: UploadedFile
    imageName: string

    constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId
        this.destination = vacation.destination
        this.description = vacation.description
        this.fromDate = vacation.fromDate
        this.toDate = vacation.toDate
        this.price = vacation.price
        this.star = vacation.star
        this.rating = vacation.rating
        this.review = vacation.review
        this.image = vacation.image
        this.imageName = vacation.imageName
    }

    private static postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        destination: Joi.string().required().min(2).max(100),        
        description: Joi.string().required().min(2).max(1000),
        fromDate: Joi.date().iso().required(),
        toDate: Joi.date().iso().required(),
        price: Joi.number().required().min(0).max(100000),
        star: Joi.number().required().integer().min(0).max(5),
        rating: Joi.number().required().min(0).max(10),
        review: Joi.number().required().integer().min(0),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    })
    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().min(1),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(1000),
        fromDate: Joi.date().iso().required(),
        toDate: Joi.date().iso().required(),
        price: Joi.number().required().min(0).max(100000),
        star: Joi.number().required().integer().min(0).max(5),
        rating: Joi.number().required().min(0).max(10),
        review: Joi.number().required().integer().min(0),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    })

    validatePost(): string {
        const result = VacationModel.postValidationSchema.validate(this, { abortEarly: false })
        return result.error?.message
    }

    validatePut(): string {
        const result = VacationModel.putValidationSchema.validate(this, { abortEarly: false })
        return result.error?.message
    }
}

export default VacationModel