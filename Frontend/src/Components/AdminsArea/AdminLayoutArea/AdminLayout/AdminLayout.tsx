import AdminMenu from "../AdminMenu/AdminMenu";
import AdminRouting from "../AdminRouting/AdminRouting";
import "./AdminLayout.css";

function AdminLayout(): JSX.Element {
    return (
        <div className="AdminLayout">


	
			 <nav>
            <AdminMenu/>
            </nav>
          <main>
            <AdminRouting/>
           
            
          </main>
        </div>
    );
}

export default AdminLayout;


{/* <div>
      <h1>main page</h1>
      <NavLink to="child1">child 1</NavLink> |||| <NavLink to="child2">child 2</NavLink>{" "}
 
     
      <Routes>
        <Route path="child1" element={<Child1 />} />
        <Route path="child2" element={<Child2 />} />
      </Routes>
    </div> */}