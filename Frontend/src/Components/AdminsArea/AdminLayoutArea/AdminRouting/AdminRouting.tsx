import { Navigate, Route, Routes } from "react-router-dom";
import FollowersReport from "../../ReportsArea/FollowersReport/FollowersReport";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationList from "../../VacationsArea/VacationList/VacationList";

function AdminRouting(): JSX.Element {
    return (
        <Routes>
        
          <Route path="/home" element={<VacationList/>}/>
          <Route path="/add-vacation" element={<AddVacation/>}/> 
          <Route path="/update-vacation" element={<UpdateVacation/>}/> 
          <Route path="/reports" element={<FollowersReport/>}/> 


        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      </Routes>

    );
}

export default AdminRouting;
