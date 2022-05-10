import FollowModel from "../../../Models/FollowModel";
import UserVacationModel from "../../../Models/UserVacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import userVacationsService from "../../../Services/UserVacationsService";
import config from "../../../Utils/Config";
import dateFormatter from "../../../Utils/formatDate";
import "./FollowingCard.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import {  RefObject, SyntheticEvent, useRef } from "react";


interface FollowingCardProps {
  userVacationData: UserVacationModel
}

// let timeout: any;
function FollowingCard(props: FollowingCardProps): JSX.Element {

  const buttonBoxRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>()

  const navigate = useNavigate()

  function unFollowVacation(vacationId: number, destination: string): void {
    // debugger
    // console.log(textBoxRef.current)
// console.log(e.target)
// console.log(e)
    try {
      // e.target.disabled = true 
      //Debounce - User can't click multiple times
      // clearTimeout(timeout)
      // timeout = setTimeout(() => deleteFollow(vacationId, destination), 500)
      
      if (buttonBoxRef.current.disabled) return 
      deleteFollow(vacationId, destination)
      buttonBoxRef.current.disabled = true

    } catch (err: any) {
      if (err.response.status === 401) {
        authService.logout()
        navigate('/login')
      } else {
        notify.error(err)
      }
    }
  }

  async function deleteFollow(vacationId: number, destination: string) {
    
    const userId = store.getState().authState.user.userId

    const unFollow = new FollowModel(userId, vacationId)

    await userVacationsService.deleteFollow(unFollow)

    notify.success(`You have unfollowed destination ${destination}`)
  }
 
  return (
    <div className="FollowingCard">

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
          {/* <IconButton className="UnFollowButton" aria-label="removeFromFavorites" onClick={(e) => unFollowVacation(props.userVacationData.vacationId, props.userVacationData.destination, e)}> */}
          <IconButton  ref={buttonBoxRef} className="UnFollowButton" aria-label="removeFromFavorites" onClick={() => unFollowVacation(props.userVacationData.vacationId, props.userVacationData.destination)}>
            <FavoriteIcon />
          </IconButton>
        </div>
      </Card>
    </div>
  );
}

export default FollowingCard;

