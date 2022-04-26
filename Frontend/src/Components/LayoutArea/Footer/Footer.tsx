import "./Footer.css";
// import {Typography} from '@material-ui/core'
import { Typography, Button } from '@mui/material/'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NavLink, useNavigate } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import IconButton from '@material-ui/core/IconButton';
import IconButton from '@mui/material/IconButton';


function Footer(): JSX.Element {
    // const navigate = useNavigate();
    return (
        <div className="Footer">
            <Typography>All Rights Reserved &copy; 2022 Jack Amsterdam</Typography>
            {/* <a href='http://www.linkedin.com/in/jack-amsterdam' target='_blank'>click</a> */}
            {/* <Button startIcon={<LinkedInIcon/>} onClick={() => navigate('www.linkedin.com/in/jack-amsterdam')}> */}
            {/* <NavLink to="/home">Home</NavLink>  */}
            {/* <a href='www.linkedin.com/in/jack-amsterdam' target='blank'></a> */}

            {/* https://github.com/jackamsterdam */}
            {/* </Button> */}
            <IconButton aria-label='http://www.linkedin.com/in/jack-amsterdam' onClick={() => window.open('http://www.linkedin.com/in/jack-amsterdam')}>
                <LinkedInIcon fontSize="large" />
            </IconButton>

            <a target="_blank" href="https://wakatime.com/@a78fee14-66a3-4481-8db3-b8983c271faf"><img src="https://wakatime.com/badge/user/a78fee14-66a3-4481-8db3-b8983c271faf.svg" alt="Total time coded since Jan 4 2022" /></a>


            <IconButton aria-label='https://github.com/jackamsterdam ' onClick={() => window.open('https://github.com/jackamsterdam ')}>
                <GitHubIcon fontSize="large" />
            </IconButton>
            {/* <img alt="Code Time" src="https://img.shields.io/endpoint?style=for-the-badge&url=https://codetime-api.datreks.com/badge/3246?logoColor=white%26project=%26recentMS=0%26showProject=false" /> */}
           
            
            <img alt="Code Time" src="https://img.shields.io/endpoint?style=social&url=https://codetime-api.datreks.com/badge/3246?logoColor=dark%26project=%26recentMS=0%26showProject=false" />
            
          {/* onclick how do i log the clicks on my linkedin???  */}
      

            {/* <a href="https://wakatime.com/@a78fee14-66a3-4481-8db3-b8983c271faf"><img src="https://wakatime.com/badge/user/a78fee14-66a3-4481-8db3-b8983c271faf.svg" alt="Total time coded since Jan 4 2022" /></a>
            <img src="https://wakatime.com/badge/user/a78fee14-66a3-4481-8db3-b8983c271faf.svg" alt="" /> */}

        </div>
    );
}

export default Footer;
