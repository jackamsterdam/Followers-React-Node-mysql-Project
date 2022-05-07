import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import VacationModel from "../../../../Models/VacationModel";
import store from "../../../../Redux/Store";
import authService from "../../../../Services/AuthService";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import Loading from "../../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import VacationModel from "../../../../Models/VacationModel";

function VacationList(): JSX.Element {
// debugger
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const navigate = useNavigate()

    useEffect(() => {


        (async function () {
            try {
                const vacations = await vacationsService.getAllVacations()
                setVacations(vacations)
            } catch (err: any) {
                if (err.response.status === 401) {
                    authService.logout()
                    navigate('/login')
                } else {
                    notify.error(err)
                }
            }
        })()

        const unsubscribe = store.subscribe(() => {
            // console.log('subscription executed in vacationslist for vacatationsstate ')

            // console.log("(store.getState().vacationsState.vacations", store.getState().vacationsState.vacations)
            let newState = store.getState().vacationsState.vacations;
            // debugger
            setVacations([...newState])
            // setVacations([{vacationId: 36, destination: 'test', description: 'testing', fromDate: "2022-04-18T21:00:00.000Z", toDate: "2022-05-18T21:00:00.000Z", price: 87, imageName: "72203bc7-6b7d-4f8b-a5b8-a996686e0d2d.jpg", image: undefined}])
            // console.log("store.getState().vacationsState.vacations", store.getState().vacationsState.vacations);

        })

        return () => unsubscribe()

    }, [])


    // async function deleteVacation(vacationId: number, destination: string): Promise<void> {
    //     try {
    //         const confirmDelete = window.confirm(`Are you sure you want to delete ${destination}?`)
    //         if (!confirmDelete) return
    //         await vacationsService.deleteVacation(vacationId)
    //         notify.success('Vacation has been deleted')
    //     } catch (err: any) {
    //         if (err.response.status === 401) {
    //             authService.logout()
    //             navigate('/login')
    //         } else {
    //             notify.error(err)
    //         }
    //     }
    // }



    return (
        <div className="VacationList">


<Paper
     className='SearchVacation'
    //   component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
   
      <InputBase
  
        onKeyUp={(e:SyntheticEvent) => {
            
       
            console.log((e.target as HTMLInputElement).value)
            const value = (e.target as HTMLInputElement).value
            // if (value === "Enter") {
            //     e.stopPropagation();
            //    }
       if (value === '')  {
           setVacations(store.getState().vacationsState.vacations)
       } else {
             const filteredResult = store.getState().vacationsState.vacations.filter(v => v.destination.toLowerCase().includes(value.toLowerCase()))
           console.log("filteredResult", filteredResult);
           setVacations(filteredResult)
       }
         
        // }

        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Vacation"
        inputProps={{ 'aria-label': 'Search Vacation' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    
    
    </Paper>


            {vacations.length === 0 && <Loading />}

            <div className="Container">
                {/* {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} deleteVacation={deleteVacation} />)} */}
                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
                {/* {vacations.length} */}
            </div>
        </div>
    );
}

export default VacationList;




  

  
