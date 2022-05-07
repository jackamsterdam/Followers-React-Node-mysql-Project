import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../../Redux/Store";
import AdminMenu from "../AdminMenu/AdminMenu";
import AdminRouting from "../AdminRouting/AdminRouting";
import "./AdminLayout.css";

function AdminLayout(): JSX.Element {


  const navigate = useNavigate()

  //code: if user is not logged in he gets transferred to login page if user is logged in but is not admin he gets transferred to /home 
  useEffect(() => {

    if (!store.getState().authState.token) {
      navigate('/login')
    } else if (store.getState().authState.user.roleId === 1) {
      navigate('/home')
    }
  
  }, [])


  return (
    <div className="AdminLayout">
      <nav>
        <AdminMenu />
      </nav>
      <main>
        <AdminRouting />
      </main>
    </div>
  );
}

export default AdminLayout;
