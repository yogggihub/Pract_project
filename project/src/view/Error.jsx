import { useNavigate } from "react-router-dom";
export default function Error() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="login">
      <h2 className="pageTitle">Page Not Found</h2>
      <button className="userRegBtn" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
