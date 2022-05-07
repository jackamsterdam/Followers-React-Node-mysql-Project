import { Server as HttpServer } from 'http'
import { Server as SocketIoServer, Socket } from 'socket.io'
import followLogic from '../05-logic/users-vacations-logic'


const clients = new Map<Socket, string>() 

function initSocket(httpServer: HttpServer): void {
  // Create socket server:
  const socketIoServer = new SocketIoServer(httpServer, { cors: { origin: ['http://localhost:3000', 'http://localhost:4200'] } })

  socketIoServer.sockets.on('connection', (socket: Socket) => {

    // 3. Listen to client messages:
    socket.on("msg-from-client", (userId) => {
      clients.set(socket, userId)
    }); 

    socket.on('disconnect', () => {  
      clients.delete(socket)
    })
  })
}

function updateAll(): void {
  clients.forEach(async (userId, socket) => {
    const userVacations = await followLogic.getAllUserVacationsData(userId)
    socket.emit('msg-from-server', userVacations)
  })
}

export default {
  initSocket,
  updateAll
}