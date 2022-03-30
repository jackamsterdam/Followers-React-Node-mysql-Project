import { useEffect } from "react";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import config from "../../../Utils/Config";
import formatDate from "../../../Utils/formatDate";
import "./UnFollowingCard.css";

interface UnFollowingCardProps {
    userVacationData: UserVacationModel
    // userId: string
}

function UnFollowingCard(props: UnFollowingCardProps): JSX.Element {
    // useEffect(() => {

    // },[])

    async function followVacation(vacationId: number): Promise<void> {
        // async function followVacation( vacationId: number):Promise<void> {



        const userId = store.getState().authState.user.userId


        console.log("userId of unfollow", userId);
        console.log("vacationId of unfollow", vacationId);

    }




    return (
        <div className="UnFollowingCard">

            <span>Destination: {props.userVacationData.destination}</span>
            <br />
            <span title={props.userVacationData.description} className="overflow">Description: {props.userVacationData.description}</span>
            <br />
            <span>Price: {props.userVacationData.price}</span>
            <br />
            <img src={config.vacationsImageUrl + props.userVacationData.imageName} alt="vacation pic" />
            <br />
            <span>From: {formatDate(props.userVacationData.fromDate)}</span>
            <br />
            <span>To: {formatDate(props.userVacationData.toDate)}</span>
            <br />

            {/* <button onClick={() => followVacation(props.userId, props.userVacationData.vacationId)}>℉</button> */}
            <button className="followBtn" onClick={() => followVacation(props.userVacationData.vacationId)}>℉</button>
            <span className="followersCount">{props.userVacationData.followersCount}</span>        </div>
    );
}

export default UnFollowingCard;
