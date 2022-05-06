import FollowModel from "../../../Models/FollowModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import config from "../../../Utils/Config";
import formatDate from "../../../Utils/formatDate";
import "./UnFollowingCard.css";


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
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import { addFollowAction } from "../../../Redux/UserVacationsState";









interface UnFollowingCardProps {
    userVacationData: UserVacationModel
    // userId: string
}
let timeout:any;
function UnFollowingCard(props: UnFollowingCardProps): JSX.Element {
  const navigate = useNavigate()
    // useEffect(() => {

    // },[])

    async function followVacation(vacationId: number, destination: string): Promise<void> {
        // async function followVacation( vacationId: number):Promise<void> {

        try {
           //Debounce - User can't click multiple times
          clearTimeout(timeout)
          timeout = setTimeout(() => addFollow(vacationId, destination), 500)
          


        } catch (err: any) {
          if (err.response.status === 401) {
            authService.logout()
            navigate('/login')
        } else {
            notify.error(err)
        }
        }

    }

    async function addFollow(vacationId: number, destination:string ) {
      const userId = store.getState().authState.user.userId


      // console.log("userId of unfollow", userId);
      // console.log("vacationId of unfollow", vacationId);


      const follow = new FollowModel(userId, vacationId)
      // console.log("follow we are in UNfollowing card AND WE ARE FOLLOING what do i look like??", follow);

      await userVacationsService.addFollow(follow)

      notify.success(`You are now following destination ${destination}!`)

    }




    return (
        <div className="UnFollowingCard">
        {/* <Card className="Card" sx={{ maxWidth: 345, margin: '5px', width: 280}}> */}
        <Card className="Card">
             <CardHeader
       
        action={
            <IconButton className="FollowButton" aria-label="addToFavorites"  onClick={() => followVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>
              <FavoriteIcon  />
            </IconButton>
         
        }
        title={props.userVacationData.destination}
        subheader={'$' + props.userVacationData.price}
      />
       <CardContent>
        <Typography  title={props.userVacationData.description} className="Overflow" variant="body2" color="text.secondary">
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
        
          <Avatar className="FollowersCount" sx={{ bgcolor: red[500] }} aria-label="followerCount">
            {props.userVacationData.followersCount}
          </Avatar>
      
      </CardContent>
    
    </Card>
    </div>
    );
}

export default UnFollowingCard;


// without material design: 
{/* <div className="UnFollowingCard">

<span>{props.userVacationData.destination}</span>
<br />

<span>{'$' + props.userVacationData.price}</span>
<br />
<span title={props.userVacationData.description} className="overflow">{props.userVacationData.description}</span>
<br />


<div className="imageVacation">
    <img src={config.vacationsImageUrl + props.userVacationData.imageName} alt="vacation pic" />

</div> */}


{/* 
<span>From: {formatDate(props.userVacationData.fromDate)}</span>
<br />
<span>To: {formatDate(props.userVacationData.toDate)}</span>
<br /> */}

{/* <span>{formatDate(props.userVacationData.fromDate)} - {formatDate(props.userVacationData.toDate)} </span>
<br /> */}

{/* <button onClick={() => followVacation(props.userId, props.userVacationData.vacationId)}>℉</button> */}
{/* <button className="followBtn" onClick={() => followVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>℉</button>
<span className="followersCount">{props.userVacationData.followersCount}</span>        </div> */}