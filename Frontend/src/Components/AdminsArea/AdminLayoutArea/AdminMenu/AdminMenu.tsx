import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">
			<NavLink to="/admin/home">Home</NavLink>
            <span>|</span>
           
            <NavLink to="/admin/add-vacation">Add Vacation</NavLink>
            <span>|</span>
            <NavLink to="/admin/reports">Reports</NavLink>
        </div>
    );
}

export default AdminMenu;
