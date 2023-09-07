import { useNavigate, Link, useParams } from "react-router-dom";
import { login } from "../../util/utils";
export default function Header() {
  const navigate = useNavigate();
  const { auth, role, id } = login();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="header">
      <div className="headerWrapper">
        <div className="topLeft">
          <span className="logo">Logo</span>
        </div>
        <div className="topRight">
          <div className="headerIcons">
            {auth ? (
              <button className="loginbtn" onClick={logout}>
                Logout
              </button>
            ) : (
              ""
            )}
          </div>
          {auth ? (
            <div className="headerNavBar">
              <Link to={`/dashboard/updateuser/${id}`}>
                <li className="navBarItem">Edit Profile</li>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
