import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../../AdminsArea/AdminLayoutArea/AdminLayout/AdminLayout';
import Login from '../../AuthArea/Login/Login';
import Logout from '../../AuthArea/Logout/Logout';
import Register from '../../AuthArea/Register/Register';
import UserLayout from '../../UsersArea/UserLayout/UserLayout';
import PageNotFound from '../PageNotFound/PageNotFound';

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/home" element={<UserLayout />} />
      
      {/* Inner Routing for Admin */}
      <Route path="/admin/*" element={<AdminLayout />} />

      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
