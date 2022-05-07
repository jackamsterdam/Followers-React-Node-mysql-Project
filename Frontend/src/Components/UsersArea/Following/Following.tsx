import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
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
                
                    const userIsFollowing = props.vacations.filter(f => f.isFollowing)

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

            const newState = store.getState().userVacationsState.userVacations
            const userIsFollowing = newState.filter(f => f.isFollowing)
            setUserVacations(userIsFollowing)

        })

        return () => unsubscribe()

    }, [])

    return (
        <div className="Following" style={{ display: userVacations.length === 0 ? 'none' : 'block' }}>
            <Typography className="Headline" component="div" variant="h5">
                My Followed Vacations
            </Typography>

            <div className="Container">
                {userVacations.map(uv => <FollowingCard key={uv.vacationId} userVacationData={uv} />)}
            </div>

        </div>
    );
}

export default Following;
