import  Joi from 'joi';
import { UploadedFile } from "express-fileupload"

class VacationModel {
  vacationId: number 
  destination: string 
  description: string 
  fromDate: string 
  toDate: string 
  price: number 
  image: UploadedFile
  imageName: string 

  constructor(vacation: VacationModel) {
      this.vacationId = vacation.vacationId
      this.destination = vacation.destination
      this.description = vacation.description
      this.fromDate = vacation.fromDate
      this.toDate = vacation.toDate
      this.price = vacation.price
      this.image = vacation.image
      this.imageName = vacation.imageName
  }

  private static postValidationSchema = Joi.object({
      vacationId: Joi.forbidden(),
      destination: Joi.string().required().min(2).max(100),         //!try with 0
      description: Joi.string().required().min(2).max(1000),
      fromDate: Joi.date().iso().required(),
      toDate: Joi.date().iso().required(),
      price: Joi.number().required().min(0).max(100000),
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
      image: Joi.object().optional(),
      imageName: Joi.string().optional()
  })

  validatePost():string {
      const result = VacationModel.postValidationSchema.validate(this, {abortEarly: false})
      return result.error?.message
  }

  validatePut():string {
      const result = VacationModel.putValidationSchema.validate(this, {abortEarly: false})
      return result.error?.message
  }
}

export default VacationModel