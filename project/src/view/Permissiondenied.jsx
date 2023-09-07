import { useNavigate } from "react-router-dom";
export default function Permissiondenied() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="login">
      <h2 className="pageTitle">You don't have access to this page</h2>
      <button className="userRegBtn" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
