import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import UserVacationModel from "../../../Models/UserVacationModel";
   import UserVacationModel from "../../../Models/UserVacationModel";

import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import Following from "../Following/Following";
import UnFollowing from "../UnFollowing/UnFollowing";
import "./UserLayout.css";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
function UserLayout(): JSX.Element {
    const [userVacations, setUserVacations] = useState<UserVacationModel[]>([])
// debugger
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
                // console.log("userId", userId);
                const userVacationsData = await userVacationsService.getAllUserVacationsData(userId)    
                // console.log("userVacationsData", userVacationsData);

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

                        {/* <Paper
     className='SearchVacation'
    //   component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
   
      <InputBase
  
        onKeyUp={(e:SyntheticEvent) => {
            
       
            console.log((e.target as HTMLInputElement).value)
            const value = (e.target as HTMLInputElement).value
            // if (value === "Enter") {
            //     e.stopPropagation();
            //    }
       if (value === '')  {
           setUserVacations(store.getState().userVacationsState.userVacations)
       } else {
             const filteredResult = store.getState().userVacationsState.userVacations.filter(v => v.destination.toLowerCase().includes(value.toLowerCase()))
           console.log("filteredResult", filteredResult);
           setUserVacations(filteredResult)
       }
         
        // }

        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Vacation"
        inputProps={{ 'aria-label': 'Search Vacation' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    
    
    </Paper> */}

	         <Following vacations={userVacations}/>	

            {/* <div className="divider"></div> */}

            <UnFollowing vacations={userVacations}/>
        </div>
    );
}

export default UserLayout;
