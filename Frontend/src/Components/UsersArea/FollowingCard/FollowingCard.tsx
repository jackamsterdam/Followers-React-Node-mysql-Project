import FollowModel from "../../../Models/FollowModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import config from "../../../Utils/Config";
import formatDate from "../../../Utils/formatDate";
import "./FollowingCard.css";

interface FollowingCardProps {
    userVacationData: UserVacationModel

}

function FollowingCard(props: FollowingCardProps): JSX.Element {

    async function unFollowVacation(vacationId: number, destination: string): Promise<void> {

        try {
            const userId = store.getState().authState.user.userId

            console.log("userId of follow", userId);
            console.log("vacationId of follow", vacationId);

            const unFollow = new FollowModel(userId, vacationId)
            console.log("follow we are in following card AND WE ARE UNFOLLOING what do i look like??", unFollow);

            await userVacationsService.deleteFollow(unFollow)

            notify.success(`You have unfollowed destination ${destination}`)



        } catch (err: any) {
            notify.error(err)
        }


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

            <button className="followBtn" onClick={() => unFollowVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>℉</button>

            <span className="followersCount">{props.userVacationData.followersCount}</span>




        </div>
    );
}

export default FollowingCard;
