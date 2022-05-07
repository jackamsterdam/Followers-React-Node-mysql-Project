import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import config from "../../../../Utils/Config";
import dateFormatter from "../../../../Utils/formatDate";
import "./VacationCard.css";
import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import authService from "../../../../Services/AuthService";
import { confirm } from 'react-confirm-box'


interface VacationCardProps {
  vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

  const navigate = useNavigate()

  async function deleteVacation(vacationId: number, destination: string): Promise<void> {

    try {

      const confirmDelete = await confirm(`Are you sure you want to delete ${destination}?`)
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


  return (
    <div className="VacationCard">
      <Card className="Card" sx={{ maxWidth: 345, margin: '5px', width: 280 }}>
        <Typography component="div" variant="h5" className='CardDestination'>
          {props.vacation.destination}
        </Typography>
        <IconButton className='CardStars'>
          {[...Array(props.vacation.star)].map((e, i) => <StarIcon key={props.vacation.vacationId + i} className="Stars" />)}
        </IconButton>
        <Typography component="div" variant="h5" className='CardPrice'>
          {'$' + props.vacation.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='FromDate'>
          {dateFormatter.formatDate(props.vacation.fromDate)} - {dateFormatter.formatDateWithYear(props.vacation.toDate)}
        </Typography>
        <CardMedia
          component="img"
          height="164"
          image={config.vacationsImageUrl + props.vacation.imageName}
          alt="vacation pic"
        />
        <CardContent>
          <Typography title={props.vacation.description} className="Overflow" variant="body2" color="text.secondary">
            {props.vacation.description}
          </Typography>
          <Typography className="OverflowEffect" variant="body2" color="text.secondary">
            <IconButton className="DeleteButton" aria-label="deleteVacation" onClick={() => deleteVacation(props.vacation.vacationId, props.vacation.destination)}>
              <ClearIcon />
            </IconButton>
            <IconButton className="EditButton" aria-label="editVacation" onClick={() => navigate('/admin/edit-vacation/' + props.vacation.vacationId)}>
              <EditIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default VacationCard;
