import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import "./FollowersReport.css";
import { useEffect, useState } from "react";
import notify from "../../../../Services/NotifyService";
import VictoryFollowModel from "../../../../Models/VictoryFollowModel";
import vacationsService from "../../../../Services/VacationsService";
import Loading from "../../../SharedArea/Loading/Loading";
import authService from '../../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function FollowersReport(): JSX.Element {
const navigate = useNavigate()
    const [followersCount, setFollowersCount] = useState<VictoryFollowModel[]>([])

    useEffect(() => {

        (async function () {

            try {
                const followersCount = await vacationsService.getAllFollowersForChart()

                // followersCount[2].vacationCount = 300
                //  console.log("followersCount", followersCount);
                
                setFollowersCount(followersCount)


            } catch (err: any) {
                if (err.response.status === 401) {
                    authService.logout()
                    navigate('/login')
                } else {
                    notify.error(err)
                }
            }

        })()

    }, [])
    // 1: {destination: 'Italy', vacationCount: 3}
    // 2: {destination: 'Spain', vacationCount: 2}
    // 3: {destination: 'Germany', vacationCount: 2}
    // 4: {destination: 'Sweden', vacationCount: 1}
    // 5: {destination: 'Sweden', vacationCount: 1}
    // 6: {destination: 'Sweden', vacationCount: 1}


    return (
        <div className="FollowersReport">
            <Typography>All the followed vacations per quantity of followers</Typography>
            {followersCount.length === 0 && <Loading />}


            <VictoryChart domainPadding={20} theme={VictoryTheme.material}  width={followersCount.length * 100} containerComponent={<VictoryContainer responsive={false} />}>



                <VictoryAxis

                    // tickValues={followersCount.map((f, i) => key={i}, f.destination)}
                    // tickValues={followersCount.map(f => f.destination)}
                    tickFormat={followersCount.map(f => f.destination)}

                // {allDesserts.map(item =>  <span key={item.id}>{item.name} | </span>)}
                />

                <VictoryAxis
                    dependentAxis

                    // tickValues={followersCount.map(f => f.vacationCount)}
                    tickFormat={followersCount.map(f => f.vacationCount)}

                />

                <VictoryBar data={followersCount} x="destination" y="vacationCount" />

            </VictoryChart>

        </div>
    );
}

export default FollowersReport;
