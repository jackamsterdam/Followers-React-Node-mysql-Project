import FollowModel from "../../../Models/FollowModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
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

    async function followVacation(vacationId: number, destination: string): Promise<void> {
        // async function followVacation( vacationId: number):Promise<void> {

        try {
            const userId = store.getState().authState.user.userId


            // console.log("userId of unfollow", userId);
            // console.log("vacationId of unfollow", vacationId);


            const follow = new FollowModel(userId, vacationId)
            // console.log("follow we are in UNfollowing card AND WE ARE FOLLOING what do i look like??", follow);

            await userVacationsService.addFollow(follow)

            notify.success(`You are now following destination ${destination}!`)


        } catch (err: any) {
            notify.error(err)
        }

    }




    return (
        <div className="UnFollowingCard">

            <span>{props.userVacationData.destination}</span>
            <br />
           
            <span>{'$' + props.userVacationData.price}</span>
            <br />
            <span title={props.userVacationData.description} className="overflow">{props.userVacationData.description}</span>
            <br />


            <div className="imageVacation">
                <img src={config.vacationsImageUrl + props.userVacationData.imageName} alt="vacation pic" />

            </div>


{/* 
            <span>From: {formatDate(props.userVacationData.fromDate)}</span>
            <br />
            <span>To: {formatDate(props.userVacationData.toDate)}</span>
            <br /> */}
            <span>{formatDate(props.userVacationData.fromDate)} - {formatDate(props.userVacationData.toDate)} </span>
            <br />

            {/* <button onClick={() => followVacation(props.userId, props.userVacationData.vacationId)}>℉</button> */}
            <button className="followBtn" onClick={() => followVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>℉</button>
            <span className="followersCount">{props.userVacationData.followersCount}</span>        </div>
    );
}

export default UnFollowingCard;
