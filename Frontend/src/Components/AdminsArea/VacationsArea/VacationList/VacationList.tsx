import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import Loading from "../../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

  const [vacations, setVacations] = useState<VacationModel[]>([])

 useEffect(()=> {

    
  (async function(){
      try {
          const vacations = await vacationsService.getAllVacations()
        //   console.log("vacations", vacations);
          setVacations(vacations)
      } catch (err: any) {
          notify.error(err)
      }
  })()

  const unsubscribe = store.subscribe(() => {
    // console.log('subscription executed in vacationslist for vacatationsstate ')

    // console.log("(store.getState().vacationsState.vacations", store.getState().vacationsState.vacations)
    setVacations(store.getState().vacationsState.vacations)

})

  return () => unsubscribe()

 },[])


 async function deleteVacation(vacationId: number, destination: string):Promise<void> {
   try {
       const confirmDelete = window.confirm(`Are you sure you want to delete ${destination}?` )
       if (!confirmDelete) return
       await vacationsService.deleteVacation(vacationId)
       notify.success('Vacation has been deleted')
   } catch (err: any) {
       notify.error(err)
   }
}



    return (
        <div className="VacationList">
            {vacations.length === 0 && <Loading/>}
  
            <div className="container">
                {vacations.map(v => <VacationCard  key={v.vacationId} vacation={v} deleteVacation={deleteVacation} />)}
            </div>
        </div>
    );
}

export default VacationList;
