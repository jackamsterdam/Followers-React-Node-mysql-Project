import { Navigate, Route, Routes } from "react-router-dom";
// import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
// import VacationList from "../../VacationsArea/VacationList/VacationList";
import {BrowserRouter} from 'react-router-dom'

function AdminRouting(): JSX.Element {
    return (
        <Routes>
        
        {/* <Route path="/admin/add-vacation" element={<AddVacation/>}/> */}
        {/* erase this:  */}
        {/* <Route path="/admin/vacation-list" element={<VacationList/>}/> */}


        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      </Routes>

    );
}

export default AdminRouting;
