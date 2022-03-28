import dotenv from 'dotenv'
dotenv.config()
import config from './01-utils/config'

import express, { NextFunction, Request, Response } from 'express'
import expressRateLimit from 'express-rate-limit'
import cors from 'cors'
import expressFileUpload from 'express-fileupload'
import errorsHandler from './02-middleware/errors-handler'
import logRequests from './02-middleware/log-request'
import sanitize from './02-middleware/sanitize'
import ErrorModel from './03-models/error-model'
import helmet from 'helmet'
import authController from './06-controllers/auth-controller'
import vacationsConroller from './06-controllers/vacations-controller'
import userVacationsController from './06-controllers/users-vacations-controller'
// import path from 'path'

const server = express() 

if (config.isDevelopment) {
    server.use(cors({origin: ['http://localhost:3000', 'http://localhost:4200']}))
}
server.use('/',expressRateLimit({windowMs: 1000, max: 10, message: 'Rate exceeded. Please try again soon'}))


server.use(helmet())
server.use(express.json())
server.use(expressFileUpload())
server.use(sanitize)
server.use(logRequests)

// const frontEndDir = path.join(__dirname, '07-frontend');
// server.use(express.static(frontEndDir))

server.use('/api', authController)
server.use('/api/admin',  vacationsConroller)
server.use('/api', userVacationsController)

server.use('*', (request: Request, response: Response, next: NextFunction) => {
    if(config.isDevelopment){
        next(new ErrorModel(404, 'Route not found'))
    }
    // else {
    //     const indexHtmlFile = path.join(__dirname, '07-frontend', 'index.html')
    //     response.sendFile(indexHtmlFile)
    // }
})
 
server.use(errorsHandler)


server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`))
