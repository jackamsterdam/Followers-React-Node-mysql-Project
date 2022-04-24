import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import UnFollowingCard from "../UnFollowingCard/UnFollowingCard";
import "./UnFollowing.css";

interface UnFollowingProps {
    vacations: UserVacationModel[]
}


function UnFollowing(props: UnFollowingProps): JSX.Element {
const navigate = useNavigate()
    const [userVacations, setUserVacations] = useState<UserVacationModel[]>([])

    useEffect(() => {


        // first we need to get userId from token so we know which user wants his vacations with the vacations he follows/unfollows (plus we get the general count of vacations folllowed along with all the vacation data)

       

        (async function () {
            try {
                if (store.getState().authState.user) {
                // const userId = store.getState().authState.user.userId;
                // console.log("userId", userId);
                // const userVacationsData = await userVacationsService.getAllUserVacationsData(userId)    
                // console.log("userVacationsData", userVacationsData);


                // const userNotFollowing = userVacationsData.filter(f => !f.isFollowing)
                const userNotFollowing = props.vacations.filter(f => !f.isFollowing)
                // console.log("userNotFollowing", userNotFollowing);

                setUserVacations(userNotFollowing)

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
        })()

        
         //Subscribing to store for changes when user follows/unfollows
         const unsubscribe = store.subscribe(() => {
         
            const newState = store.getState().userVacationsState.userVacations
            // console.log("newState", newState);
            const userNotFollowing = newState.filter(f => !f.isFollowing)
            // console.log("userNotFollowing", userNotFollowing);
            setUserVacations(userNotFollowing)
          
        })

        return () => unsubscribe()


    }, [])



    return (
        <div className="UnFollowing" style={{display: userVacations.length === 0 ? 'none':'block'}}>
            {/* {userVacations.length !== 0 && <Loading />} */}

            <div className="Container">

                {/* {userVacations.map(uv => <UnFollowingCard key={uv.vacationId} userVacationData={uv} userId={userId} />)} */}
                {userVacations.map(uv => <UnFollowingCard key={uv.vacationId} userVacationData={uv} />)}
            </div>
        </div>
    );
}

export default UnFollowing;
