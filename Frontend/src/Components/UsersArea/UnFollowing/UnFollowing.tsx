import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
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
                 
                    const userNotFollowing = props.vacations.filter(f => !f.isFollowing)

                    setUserVacations(userNotFollowing)

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

            const newState = store.getState().userVacationsState.userVacations
            const userNotFollowing = newState.filter(f => !f.isFollowing)

            setUserVacations(userNotFollowing)

        })

        return () => unsubscribe()

    }, [])



    return (
        <div className="UnFollowing" style={{ display: userVacations.length === 0 ? 'none' : 'block' }}>
            <Typography className="Headline" component="div" variant="h5">
                All Vacations
            </Typography>

            <div className="Container">
                {userVacations.map(uv => <UnFollowingCard key={uv.vacationId} userVacationData={uv} />)}
            </div>
        </div>
    );
}

export default UnFollowing;
