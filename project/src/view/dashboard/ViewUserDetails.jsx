import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
export default function ViewUserDetails() {
  const [userFullDetails, setUserFullDetails] = useState();
  const { userid } = useParams();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.userDetails);
  useEffect(() => {
    setUserFullDetails(data.filter((item) => item.id === +`${userid}`));
  }, []);
  const goBack = () => {
    navigate(-1);
  };
  const userFullInfo = userFullDetails?.map((item) => (
    <div className="viewField">
      <div className="regField">
        <div>Role</div>
        <div>{item.userRole}</div>
      </div>
      <div className="regField">
        <div>First Name</div>
        <div>{item.firstName}</div>
      </div>
      <div className="regField">
        <div>Last Name</div>
        <div>{item.lastName}</div>
      </div>
      <div className="regField">
        <div>Gender</div>
        <div>{item.gender}</div>
      </div>
      <div className="regField">
        <div>DOB</div>
        <div>{item.birthDay}</div>
      </div>
      <div className="regField">
        <div>Mobile</div>
        <div>{item.mobile}</div>
      </div>
      <div className="regField">
        <div>Email</div>
        <div>{item.email}</div>
      </div>
      <div className="regField">
        <div>Address</div>
        <div>{item.address}</div>
      </div>
      <div className="regField">
        <div>City*</div>
        <div>{item.city}</div>
      </div>
      <div className="regField">
        <div>State</div>
        <div>{item.state}</div>
      </div>
      <div className="regField">
        <div>Country</div>
        <div>{item.country}</div>
      </div>
    </div>
  ));
  return (
    <>
      <Sidebar />
      <div className="viewcontainer">
        <h2 className="pageTitle">Details</h2>
        {userFullInfo}
        <div className="backBtn" onClick={goBack}>
          Back
        </div>
      </div>
    </>
  );
}
