import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import store from "../../../../Redux/Store";
import authService from "../../../../Services/AuthService";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import Loading from "../../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

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


    async function deleteVacation(vacationId: number, destination: string): Promise<void> {
        try {
            const confirmDelete = window.confirm(`Are you sure you want to delete ${destination}?`)
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
        <div className="VacationList">
            {vacations.length === 0 && <Loading />}

            <div className="Container">
                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} deleteVacation={deleteVacation} />)}
                {/* {vacations.length} */}
            </div>
        </div>
    );
}

export default VacationList;
