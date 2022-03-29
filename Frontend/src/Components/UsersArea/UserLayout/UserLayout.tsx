import Following from "../Following/Following";
import UnFollowing from "../UnFollowing/UnFollowing";
import "./UserLayout.css";

function UserLayout(): JSX.Element {
    return (
        <div className="UserLayout">
	         <Following/>	

            {/* <div className="divider"></div> */}

            <UnFollowing/>
        </div>
    );
}

export default UserLayout;
