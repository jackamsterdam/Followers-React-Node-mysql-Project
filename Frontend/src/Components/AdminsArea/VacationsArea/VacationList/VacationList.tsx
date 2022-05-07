import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../../Redux/Store";
import authService from "../../../../Services/AuthService";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import Loading from "../../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import VacationModel from "../../../../Models/VacationModel";

function VacationList(): JSX.Element {

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
        
            let newState = store.getState().vacationsState.vacations;

            setVacations([...newState])

        })

        return () => unsubscribe()

    }, [])

    return (
        <div className="VacationList">

            <Paper
                className='SearchVacation'
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase

                    onKeyUp={(e: SyntheticEvent) => {

                        const value = (e.target as HTMLInputElement).value
                       
                        if (value === '') {
                            setVacations(store.getState().vacationsState.vacations)

                        } else {
                            const filteredResult = store.getState().vacationsState.vacations.filter(v => v.destination.toLowerCase().includes(value.toLowerCase()))
                            setVacations(filteredResult)
                        }
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
                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </div>
        </div>
    );
}

export default VacationList;







