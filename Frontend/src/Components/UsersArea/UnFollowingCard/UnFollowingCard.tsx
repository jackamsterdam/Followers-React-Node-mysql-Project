import FollowModel from "../../../Models/FollowModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import config from "../../../Utils/Config";
import dateFormatter from "../../../Utils/formatDate";
import "./UnFollowingCard.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StarIcon from '@mui/icons-material/Star';


interface UnFollowingCardProps {
  userVacationData: UserVacationModel
}

let timeout: any;

function UnFollowingCard(props: UnFollowingCardProps): JSX.Element {
  const navigate = useNavigate()

  async function followVacation(vacationId: number, destination: string): Promise<void> {

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

  async function addFollow(vacationId: number, destination: string) {

    const userId = store.getState().authState.user.userId

    const follow = new FollowModel(userId, vacationId)

    await userVacationsService.addFollow(follow)

    notify.success(`You are now following destination ${destination}!`)

  }




  return (
    <div className="UnFollowingCard">
    
      <Card className='HorizontalCard' sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }} className='CardContent'>
            <IconButton className='CardStars'>
              {[...Array(props.userVacationData.star)].map((e, i) => <StarIcon key={props.userVacationData.vacationId + i} className="Stars" />)}
            </IconButton>
            <Typography component="div" variant="h5" className='CardDestination'>
              {props.userVacationData.destination}
            </Typography>
            <Typography component="div" variant="h5" className='CardPrice'>
              {'$' + props.userVacationData.price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" className="Overflow" title={props.userVacationData.description}>
              {props.userVacationData.description}
            </Typography>
            <Typography className='FromDate' variant="body2" color="text.secondary">
              {dateFormatter.formatDate(props.userVacationData.fromDate)} - {dateFormatter.formatDateWithYear(props.userVacationData.toDate)}
            </Typography>
            <Typography className="FollowersCount" title='followers' aria-label="followerCount">
              {props.userVacationData.followersCount}
            </Typography>
            <IconButton className="Likes" title='Number of followers'>
              <ThumbUpAltIcon />
            </IconButton>
          </CardContent>
        </Box>
        <div className='ImageVacation'>
          <CardMedia
            component="img"
            height="140"
            image={config.vacationsImageUrl + props.userVacationData.imageName}
            alt="vacation picture"
          />
          <IconButton className="FollowButton" aria-label="addToFavorites" onClick={() => followVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>
            <FavoriteBorderIcon />
          </IconButton>
        </div>
      </Card>

    </div>
  );
}

export default UnFollowingCard;

