import { io, Socket } from "socket.io-client"
import UserVacationModel from "../Models/UserVacationModel"
import store from "../Redux/Store"
import { fetchUserVacationsAction } from "../Redux/UserVacationsState"

class SocketService {
    private socket: Socket

    getSocket(): Socket {
        return this.socket;
    }

    connect():void {
      
        this.socket = io('http://localhost:3001')
        this.socket.on('msg-from-server', (userVacations: UserVacationModel[]) => {
            // alert(userVacations.length)
            // store.dispatch(socketSendAction(msg))
            store.dispatch(fetchUserVacationsAction(userVacations))
        })
        //  Send the current userId to the server when connecting to the socket
        this.socket.emit('msg-from-client',  store.getState().authState.user.userId)

    }

    disconnect():void {
        this.socket.disconnect()
    }
}

const socketService = new SocketService()

export default socketService