import {Server as HttpServer} from 'http'
import {Server as SocketIoServer, Socket } from 'socket.io'
import logger from '../01-utils/log-helper'
import followLogic from '../05-logic/users-vacations-logic'

    // amitAll(vacations) {
    //       // Send the updated vacatons to all connected useres:
    //       socketIoServer.sockets.emit("updated-vacation", vacations);
    // }
    const clients = new Map<Socket, string>() //<Socket, userid>
function initSocket(httpServer: HttpServer):void {
         // Create socket server:
      const socketIoServer = new SocketIoServer(httpServer, {cors: {origin: ['http://localhost:3000', 'http://localhost:4200']}})


    
      socketIoServer.sockets.on('connection', (socket: Socket) => {
          console.log('Client has been connected, Total client count:' + socketIoServer.engine.clientCount)
          logger.info('Client has been connected, Total client count:' + socketIoServer.engine.clientCount)

      



          // 3. Listen to client messages:
          socket.on("msg-from-client", (userId) => {
            clients.set(socket, userId)
            console.log("userIddddd", userId);
            console.log("sockettttt", socket);
            // updateAll()
            // console.log("Client sent message: ", msg);

            // Send back the message to all sockets:
      
            // sockets.emit('msg-from-server','hi from server')
          });




        //  DOES this supposed to be outside or inside ?????? 
          // socketIoServer.sockets.emit('msg-from-server','hi from server')

          socket.on('disconnect', () => {  //! check if count is correct and should i console log it or log it ?
                  console.log('Client has been disconnected, Total client count:' + socketIoServer.engine.clientCount)
                  logger.info('Client has been disconnected, Total client count:' + socketIoServer.engine.clientCount)

                  clients.delete(socket)
              })
                  
                    
   })



      
} 

function updateAll():void{
  clients.forEach(async (userId, socket) => {
    const userVacations = await followLogic.getAllUserVacationsData(userId)
   socket.emit('msg-from-server', userVacations)
  })

}

export default {
  initSocket,
  updateAll
}