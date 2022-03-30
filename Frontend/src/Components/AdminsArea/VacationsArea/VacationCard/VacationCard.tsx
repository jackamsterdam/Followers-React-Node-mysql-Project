import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import config from "../../../../Utils/Config";
import formatDate from "../../../../Utils/formatDate";
import "./VacationCard.css";

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



      // async function deleteVacation(vacationId: number, destination: string):Promise<void> {
//    try {
//        const confirmDelete = window.confirm(`Are you sure you want to delete ${destination}?` )
//        if (!confirmDelete) return
//        await vacationsService.deleteVacation(vacationId)
//        notify.success('Vacation has been deleted')
//    } catch (err: any) {
//        notify.error(err)
//    }
// }









    return (
        <div className="VacationCard">
			<span>Destination: {props.vacation.destination}</span>
            <br />
			<span title={props.vacation.description} className="overflow">Description: {props.vacation.description}</span>
            <br />
			<span>Price: {props.vacation.price}</span>
            <br />
            <img src={config.vacationsImageUrl + props.vacation.imageName} alt="vacation pic" />
            <br />
			<span>From: {formatDate(props.vacation.fromDate)}</span>
            <br />
			<span>To: {formatDate(props.vacation.toDate)}</span>
            <br />
            {/* <button onClick={() => deleteVacation(props.vacation.vacationId, props.vacation.destination)}>❌</button> */}
            <button className="deleteButton" onClick={() => props.deleteVacation(props.vacation.vacationId, props.vacation.destination)}>❌</button>
   
            {/* inner route admin/  */}
            <button className="editButton" onClick={() => navigate('/admin/edit-vacation/' + props.vacation.vacationId)}>✏</button>

        </div>
    );
}

export default VacationCard;
