import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import socketService from "../../../Services/SocketService";
import userVacationsService from "../../../Services/UserVacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import Following from "../Following/Following";
import UnFollowing from "../UnFollowing/UnFollowing";
import "./UserLayout.css";

function UserLayout(): JSX.Element {
    const [userVacations, setUserVacations] = useState<UserVacationModel[]>([])
    const navigate = useNavigate()

    //code: if user is not logged in he gets transfered to login page if user is logged in and is admin he gets transfered to admin area 
    useEffect(() => {

        if (!store.getState().authState.token) {
            navigate('/login')
        } else if (store.getState().authState.user.roleId === 2) {
            navigate('/admin/home')
        }
        else {
            //Open socket connection
            socketService.connect()
            getAllVacations()
        }

    }, [])

    async function getAllVacations() {
        try {
            if (store.getState().authState.user) {
                const userId = store.getState().authState.user.userId;
                const userVacationsData = await userVacationsService.getAllUserVacationsData(userId)

                setUserVacations(userVacationsData)

            }

        } catch (err: any) {
            if (err.response.status === 401) {
                authService.logout()
                navigate('/login')
            } else {
                notify.error(err)
            }
        }
    }

    return (
        <div className="UserLayout">
            {userVacations.length === 0 && <Loading />}

            <Following vacations={userVacations} />

            <UnFollowing vacations={userVacations} />
        </div>
    );
}

export default UserLayout;
