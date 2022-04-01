import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import "./FollowersReport.css";
import { useEffect, useState } from "react";
import notify from "../../../../Services/NotifyService";
import VictoryFollowModel from "../../../../Models/VictoryFollowModel";
import vacationsService from "../../../../Services/VacationsService";
import Loading from "../../../SharedArea/Loading/Loading";

function FollowersReport(): JSX.Element {

    const [followersCount, setFollowersCount] = useState<VictoryFollowModel[]>([])

    useEffect(() => {

        (async function () {

            try {
                const followersCount = await vacationsService.getAllFollowersForChart()
                // console.log("followersCount", followersCount);
                setFollowersCount(followersCount)


            } catch (err: any) {
                notify.error(err)
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
            <h1>Following Report</h1>
            {followersCount.length === 0 && <Loading />}


            <VictoryChart domainPadding={20} theme={VictoryTheme.material}  width={followersCount.length * 100}   containerComponent={<VictoryContainer responsive={false} />}>



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
