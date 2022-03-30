import { useEffect, useState } from "react";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import userVacationsService from "../../../Services/UserVacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import "./Following.css";

function Following(): JSX.Element {

    const [userVacations, setUserVacations] = useState<UserVacationModel[]>([])



    useEffect(() => {


        // first we need to get userId from token so we know which user wants his vacations with the vacations he follows/unfollows (plus we get the general count of vacations folllowed along with all the vacation data)

        const userId = store.getState().authState.user.userId
        console.log("userId", userId);

        (async function () {
            try {

             const userVacationsData = await userVacationsService.getAllUserVacationsData(userId)
             console.log("userVacationsData", userVacationsData);


const userIsFollowing = userVacationsData.filter(f => f.isFollowing)
console.log("userIsFollowing", userIsFollowing);

setUserVacations(userIsFollowing)



            } catch (err: any) {

            }
        })()


    }, [])



    return (
        <div className="Following">
            {userVacations.length === 0 && <Loading />}

            {userVacations.map(u => u.destination)}

            {/* {userVacations.map(uv => <Follo)} */}
        </div>
    );
}

export default Following;
