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

    return (
        <div className="FollowersReport">
            <Typography>All the followed vacations per quantity of followers</Typography>
            {followersCount.length === 0 && <Loading />}

            <VictoryChart domainPadding={20} theme={VictoryTheme.material} width={followersCount.length * 100} containerComponent={<VictoryContainer responsive={false} />}>

                <VictoryAxis
                    tickFormat={followersCount.map(f => f.destination)}
                />

                <VictoryAxis
                    dependentAxis
                    tickFormat={followersCount.map(f => f.vacationCount)}
                />

                <VictoryBar data={followersCount} x="destination" y="vacationCount" />

            </VictoryChart>

        </div>
    );
}

export default FollowersReport;
