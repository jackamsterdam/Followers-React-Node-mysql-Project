import {Server as HttpServer} from 'http'
import {Server as SocketIoServer, Socket } from 'socket.io'
import logger from '../01-utils/log-helper'
    // amitAll(vacations) {
    //       // Send the updated vacatons to all connected useres:
    //       socketIoServer.sockets.emit("updated-vacation", vacations);
    // }

function socketLogic(httpServer: HttpServer):void {
         // Create socket server:
      const socketIoServer = new SocketIoServer(httpServer, {cors: {origin: ['http://localhost:3000', 'http://localhost:4200']}})
    
      socketIoServer.sockets.on('connection', (socket: Socket) => {
          console.log('Client has been connected, Total client count:' + socketIoServer.engine.clientCount)
          logger.info('Client has been connected, Total client count:' + socketIoServer.engine.clientCount)

        //  DOES this supposed to be outside or inside ?????? 
          socketIoServer.sockets.emit('msg-from-server',           )

socket.on('disconnect', () => {  //! check if count is correct and should i console log it or log it ?
        console.log('Client has been disconnected, Total client count:' + socketIoServer.engine.clientCount)
        logger.info('Client has been disconnected, Total client count:' + socketIoServer.engine.clientCount)
    })
         
          
      })

      
} 

export default socketLogic