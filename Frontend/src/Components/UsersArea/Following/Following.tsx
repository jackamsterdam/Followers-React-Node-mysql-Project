import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import FollowingCard from "../FollowingCard/FollowingCard";
import "./Following.css";

interface FollowingProps {
    vacations: UserVacationModel[]

}

function Following(props: FollowingProps): JSX.Element {
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

debugger
                const userIsFollowing = props.vacations.filter(f => f.isFollowing)
                // console.log("userIsFollowing", userIsFollowing);

                setUserVacations(userIsFollowing)
                }

            } catch (err: any) {
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
            // console.log('subscription executed in Following after user followed or unfollowed')

            const newState = store.getState().userVacationsState.userVacations
            const userIsFollowing = newState.filter(f => f.isFollowing)
             setUserVacations(userIsFollowing)

            // setUserVacations(store.getState().userVacationsState.userVacations)
            // console.log("FOLLOWstore.getState().userVacationsState.userVacations", store.getState().userVacationsState.userVacations);
        })

        return () => unsubscribe()


    }, [])

    return (
        <div className="Following" style={{display: userVacations.length === 0 ? 'none':'block'}}>
                   <Typography className="Headline" component="div" variant="h5">
            My Followed Vacations
              </Typography>
            {/* {userVacations.length === 0 && <Loading />} */}

            {/* {userVacations.map(u => u.destination)} */}

            <div className="Container">

                {userVacations.map(uv => <FollowingCard key={uv.vacationId} userVacationData={uv}   />)}
            </div>

        </div>
    );
}

export default Following;
