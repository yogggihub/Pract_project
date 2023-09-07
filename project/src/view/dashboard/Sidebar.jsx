import { Link } from "react-router-dom";
import { login } from "../../util/utils";
import { USER_TYPES } from "../../const/const";
export default function Sidebar() {
  const { auth, token, userRole } = login();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h2 className="sidebarTitle"> </h2>
          <ul className="sidebarList">
            <Link to="/dashboard/home">
              <li className="sidebarListItem">Home</li>
            </Link>
            {auth && userRole === USER_TYPES.ADMIN ? (
              <Link to="/dashboard/userlist">
                <li className="sidebarListItem">Users</li>
              </Link>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
