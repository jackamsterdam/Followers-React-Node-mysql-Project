import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import Following from "../Following/Following";
import UnFollowing from "../UnFollowing/UnFollowing";
import "./UserLayout.css";

function UserLayout(): JSX.Element {
    const [userVacations, setUserVacations] = useState<UserVacationModel[]>([])

    const navigate = useNavigate()

    // console.log("store.getState().authState.token", store.getState().authState.token);
    //code: if user is not logged in he gets transfered to login page if user is logged in and is admin he gets transfered to admin area 
    useEffect(() => {
        if (!store.getState().authState.token) {
            navigate('/login')
        } else if (store.getState().authState.user.roleId === 2) {
            navigate('/admin/home')
        } 
         else {
           getAllVacations()
         }

//! maybe you need to return check if sockets are opened for above casess and where to put socket discounnect
//         socketService.connect()
// // //???????
//         return () => socketService.disconnect()
        
    }, [])

    async function getAllVacations() {
            try {
                if (store.getState().authState.user) {
                const userId = store.getState().authState.user.userId;
                console.log("userId", userId);
                const userVacationsData = await userVacationsService.getAllUserVacationsData(userId)    
                console.log("userVacationsData", userVacationsData);

                setUserVacations(userVacationsData)

                }

            } catch (err: any) {
                debugger
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

	         <Following vacations={userVacations}/>	

            {/* <div className="divider"></div> */}

            <UnFollowing vacations={userVacations}/>
        </div>
    );
}

export default UserLayout;
