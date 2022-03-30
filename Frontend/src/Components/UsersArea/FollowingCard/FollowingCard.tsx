import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import config from "../../../Utils/Config";
import formatDate from "../../../Utils/formatDate";
import "./FollowingCard.css";

interface FollowingCardProps {
    userVacationData: UserVacationModel

}

function FollowingCard(props: FollowingCardProps): JSX.Element {

    async function unFollowVacation(vacationId: number): Promise<void> {

        const userId = store.getState().authState.user.userId

        console.log("userId of follow", userId);
        console.log("vacationId of follow", vacationId);

    }

    return (
        <div className="FollowingCard">
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

            <button className="followBtn" onClick={() => unFollowVacation(props.userVacationData.vacationId)}>℉</button>

            <span className="followersCount">{props.userVacationData.followersCount}</span>




        </div>
    );
}

export default FollowingCard;
