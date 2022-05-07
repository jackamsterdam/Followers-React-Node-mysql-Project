import { io, Socket } from "socket.io-client"
import UserVacationModel from "../Models/UserVacationModel"
import store from "../Redux/Store"
import { fetchUserVacationsAction } from "../Redux/UserVacationsState"
import config from "../Utils/Config"

class SocketService {
    private socket: Socket

    getSocket(): Socket {
        return this.socket;
    }

    connect(): void {

        this.socket = io(config.socketUrl)
        this.socket.on('msg-from-server', (userVacations: UserVacationModel[]) => {
            store.dispatch(fetchUserVacationsAction(userVacations))
        })
        this.socket.emit('msg-from-client', store.getState().authState.user.userId)
    }

    disconnect(): void {
        this.socket.disconnect()
    }
}

const socketService = new SocketService()

export default socketService