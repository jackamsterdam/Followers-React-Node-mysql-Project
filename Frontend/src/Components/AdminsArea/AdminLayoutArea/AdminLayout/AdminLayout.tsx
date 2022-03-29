import { NavLink, Route, Routes } from "react-router-dom";
import Child1 from "../../../Child1/Child1";
import Child2 from "../../../Child2/Child2";
// import AdminMenu from "../AdminMenu/AdminMenu";
// import AdminRouting from "../AdminRouting/AdminRouting";
// import "./AdminLayout.css";

function AdminLayout(): JSX.Element {
    return (
        <div className="AdminLayout">

<div>
      <h1>main page</h1>
      <NavLink to="child1">child 1</NavLink> |||| <NavLink to="child2">child 2</NavLink>{" "}
 
     
      <Routes>
        <Route path="child1" element={<Child1 />} />
        <Route path="child2" element={<Child2 />} />
      </Routes>
    </div>
		
			 {/* <nav>
            <AdminMenu/>
          </nav> */}
          {/* <main>
            <AdminRouting/>
          </main> */}
        </div>
    );
}

export default AdminLayout;
