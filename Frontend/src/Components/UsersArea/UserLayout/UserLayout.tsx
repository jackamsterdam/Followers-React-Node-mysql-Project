import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import socketService from "../../../Services/SocketService";
import Following from "../Following/Following";
import UnFollowing from "../UnFollowing/UnFollowing";
import "./UserLayout.css";

function UserLayout(): JSX.Element {


    const navigate = useNavigate()

    // console.log("store.getState().authState.token", store.getState().authState.token);
    //code: if user is not logged in he gets transfered to login page if user is logged in and is admin he gets transfered to admin area 
    useEffect(() => {
        if (!store.getState().authState.token) {
            navigate('/login')
        } else if (store.getState().authState.user.roleId === 2) {
            navigate('/admin/home')
        } 
        // else {
        //     navigate('/home')
        // }

//! maybe you need to return check if sockets are opened for above casess and where to put socket discounnect
        socketService.connect()
//???????
        return () => socketService.disconnect()
        
    }, [])




    return (
        <div className="UserLayout">
	         <Following/>	

            {/* <div className="divider"></div> */}

            <UnFollowing/>
        </div>
    );
}

export default UserLayout;
