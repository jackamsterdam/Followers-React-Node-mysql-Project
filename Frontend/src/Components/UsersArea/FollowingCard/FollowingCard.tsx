import FollowModel from "../../../Models/FollowModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import config from "../../../Utils/Config";
import formatDate from "../../../Utils/formatDate";
import "./FollowingCard.css";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';



interface FollowingCardProps {
    userVacationData: UserVacationModel

}

function FollowingCard(props: FollowingCardProps): JSX.Element {

    async function unFollowVacation(vacationId: number, destination: string): Promise<void> {

        try {
            const userId = store.getState().authState.user.userId

            // console.log("userId of follow", userId);
            // console.log("vacationId of follow", vacationId);

            const unFollow = new FollowModel(userId, vacationId)
            // console.log("follow we are in following card AND WE ARE UNFOLLOING what do i look like??", unFollow);

            await userVacationsService.deleteFollow(unFollow)

            notify.success(`You have unfollowed destination ${destination}`)



        } catch (err: any) {
            notify.error(err)
        }


    }
    // console.log(config.vacationsImageUrl);  //http://localhost:3001/api/vacations/images/
    // console.log(props.userVacationData.imageName); //a295d8d5-02f4-4811-ad1e-1798e48b7f09.jpg
//!addd div for styoling!! 
    return (
        <div className="FollowingCard">
        <Card className="Card" sx={{ maxWidth: 345, margin: '5px', width: 280}}>
        <CardHeader
  
   action={
       <IconButton className="UnFollowButton" aria-label="removeFromFavorites"  onClick={() => unFollowVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>
         <FavoriteIcon  />
       </IconButton>
    
   }
   title={props.userVacationData.destination}
   subheader={'$' + props.userVacationData.price}
 />
  <CardContent>
   <Typography title={props.userVacationData.description} className="Overflow" variant="body2" color="text.secondary">
      {props.userVacationData.description}
   </Typography>
 </CardContent>
 <CardMedia
   component="img"
   height="140"
   image={config.vacationsImageUrl + props.userVacationData.imageName}
   alt="vacation pic"
 />
 <CardContent>
  
   <Typography variant="body2" color="text.secondary">
   {formatDate(props.userVacationData.fromDate)} - {formatDate(props.userVacationData.toDate)} 
   </Typography>
   {/* put the color in css after  */}
     <Avatar className="FollowersCount" sx={{ bgcolor: red[500] }} aria-label="followerCount">
       {props.userVacationData.followersCount}
     </Avatar>
 
 </CardContent>

</Card>
</div>
    );
}

export default FollowingCard;



{/* <div className="FollowingCard">
<span>{props.userVacationData.destination}</span>
<br />
<span>{'$' + props.userVacationData.price}</span>
<br />
<span title={props.userVacationData.description} className="overflow">{props.userVacationData.description}</span>
<br /> */}

{/* testing only:  */}
{/* <img src="http://localhost:3001/api/vacations/images/1e710025-0682-471f-9847-7929ea310e07.jpg" alt="" /> */}

{/* <div className="imageVacation">
    <img src={config.vacationsImageUrl + props.userVacationData.imageName} alt="vacation pic" />
</div>

<span>{formatDate(props.userVacationData.fromDate)} - {formatDate(props.userVacationData.toDate)} </span>
<br />
<button className="followBtn" onClick={() => unFollowVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>℉</button>

<span className="followersCount">{props.userVacationData.followersCount}</span>




</div> */}