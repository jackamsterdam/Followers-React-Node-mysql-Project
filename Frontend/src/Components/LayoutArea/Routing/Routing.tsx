import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../HomeArea/Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';

function Routing(): JSX.Element {
    return (
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    );
}

export default Routing;
