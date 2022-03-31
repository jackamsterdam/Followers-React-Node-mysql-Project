import { useEffect, useState } from "react";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import userVacationsService from "../../../Services/UserVacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import UnFollowingCard from "../UnFollowingCard/UnFollowingCard";
import "./UnFollowing.css";

function UnFollowing(): JSX.Element {

    const [userVacations, setUserVacations] = useState<UserVacationModel[]>([])

    useEffect(() => {


        // first we need to get userId from token so we know which user wants his vacations with the vacations he follows/unfollows (plus we get the general count of vacations folllowed along with all the vacation data)

        const userId = store.getState().authState.user.userId
        console.log("userId", userId);

        (async function () {
            try {

                const userVacationsData = await userVacationsService.getAllUserVacationsData(userId)
                console.log("userVacationsData", userVacationsData);


                const userNotFollowing = userVacationsData.filter(f => !f.isFollowing)
                console.log("userNotFollowing", userNotFollowing);

                setUserVacations(userNotFollowing)



            } catch (err: any) {

            }
        })()

        
         //Subscribing to store for changes when user follows/unfollows
         const unsubscribe = store.subscribe(() => {
            console.log('subscription executed in Following after user followed or unfollowed')

            setUserVacations(store.getState().userVacationsState.userVacations)
        })

        return () => unsubscribe()


    }, [])



    return (
        <div className="UnFollowing">
            {userVacations.length === 0 && <Loading />}

            <div className="container">

                {/* {userVacations.map(uv => <UnFollowingCard key={uv.vacationId} userVacationData={uv} userId={userId} />)} */}
                {userVacations.map(uv => <UnFollowingCard key={uv.vacationId} userVacationData={uv} />)}
            </div>
        </div>
    );
}

export default UnFollowing;
