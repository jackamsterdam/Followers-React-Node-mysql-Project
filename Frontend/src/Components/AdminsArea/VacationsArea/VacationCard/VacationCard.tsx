import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import config from "../../../../Utils/Config";
import formatDate from "../../../../Utils/formatDate";
import "./VacationCard.css";


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
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import authService from "../../../../Services/AuthService";



interface VacationCardProps {
	vacation: VacationModel
    deleteVacation: (vacationId: number, destination: string) => void
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate()


    // this is exported: imported: 
//     function formatDate(date: string):string {
//         const d = new Date(date)
//         return d.toLocaleDateString()
//       }



      async function deleteVacation(vacationId: number, destination: string):Promise<void> {
   try {
       const confirmDelete = window.confirm(`Are you sure you want to delete ${destination}?` )
       if (!confirmDelete) return
       await vacationsService.deleteVacation(vacationId)
       notify.success('Vacation has been deleted')
   } catch (err: any) {
    if (err.response.status === 401) {
      authService.logout()
      navigate('/login')
  } else {
      notify.error(err)
  }
   }
}






// cant give VacationCard directly on the <Card> doesnt work for some reason 


    return (
        <div className="VacationCard">
        <Card className="Card" sx={{ maxWidth: 345, margin: '5px', width: 280}}>
        <CardHeader
  
   action={
       <>
       <IconButton className="DeleteButton" aria-label="deleteVacation"  onClick={() => deleteVacation(props.vacation.vacationId, props.vacation.destination)}>
         <ClearIcon  />
       </IconButton>
       <IconButton  className="EditButton" aria-label="editVacation" onClick={() => navigate('/admin/edit-vacation/' + props.vacation.vacationId)}>
         <EditIcon  />
       </IconButton>
    </>
   }
   title={props.vacation.destination}
   subheader={'$' + props.vacation.price}
 />
  <CardContent>
   <Typography  title={props.vacation.description} className="Overflow" variant="body2" color="text.secondary">
      {props.vacation.description}
   </Typography>
 </CardContent>
 <CardMedia
   component="img"
   height="140"
   image={config.vacationsImageUrl + props.vacation.imageName}
   alt="vacation pic"
 />
 <CardContent>
  
   <Typography variant="body2" color="text.secondary">
   {formatDate(props.vacation.fromDate)} - {formatDate(props.vacation.toDate)} 
   </Typography>
   
    
 
 </CardContent>

</Card>
</div> 
    );
}

export default VacationCard;




{/* <div className="VacationCard">
<span>{props.vacation.destination}</span>
<br />
<span>{'$' + props.vacation.price}</span>
<br />
<span title={props.vacation.description} className="overflow">{props.vacation.description}</span>
<br />
<div className="imageVacation">
<img src={config.vacationsImageUrl + props.vacation.imageName} alt="vacation pic" />
</div>

<span>{formatDate(props.vacation.fromDate)} - {formatDate(props.vacation.toDate)} </span>
<br /> */}

{/* 2 options for delete either in or outsidde  */}
{/* firstoption: which we are currently using */}
{/* <button className="deleteButton" onClick={() => deleteVacation(props.vacation.vacationId, props.vacation.destination)}>❌</button> */}
{/* second option:which we are not currently using */}
{/* <button className="deleteButton" onClick={() => props.deleteVacation(props.vacation.vacationId, props.vacation.destination)}>❌</button> */}

{/* inner route admin/  */}
{/* <button className="editButton" onClick={() => navigate('/admin/edit-vacation/' + props.vacation.vacationId)}>✏</button>

</div> */}

