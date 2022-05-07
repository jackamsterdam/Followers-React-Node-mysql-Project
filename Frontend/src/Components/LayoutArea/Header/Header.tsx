import Logo from "../Logo/Logo";
import "./Header.css";
import { Typography } from '@mui/material/'

import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Logo />
            <Typography className='VacationHeader'>Vacations by Jack</Typography>
            <AuthMenu />
        </div>
    );
}

export default Header;
