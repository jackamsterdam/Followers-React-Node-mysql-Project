import { io, Socket } from "socket.io-client"
import UserVacationModel from "../Models/UserVacationModel"
import store from "../Redux/Store"
import { socketSendAction } from "../Redux/UserVacationsState"

class SocketService {
    private socket: Socket


    connect():void {

        this.socket = io('http://localhost:3001')
        this.socket.on('msg-from-server', (msg: UserVacationModel[]) => {
            store.dispatch(socketSendAction(msg))
        })
    }

    disconnect():void {
        this.socket.disconnect()
    }

}

const socketService = new SocketService()

export default socketService