import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MAIL_REGEX,
  MOBILE_NO_REGEX,
  USER_TYPES,
  EMPTY_OPTION,
  COUNTY_OPTIONS,
} from "../../const/const";
import { COUNTRIES_DATA, INITIAL_FORM_VALUES } from "../../const/form-fileld";
import {
  updateUser,
  getLoginUser,
  saveUser,
} from "../../side_effect/usersDetailsSlice";
import { login } from "../../util/utils";
import Sidebar from "./Sidebar";
export default function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, role, id } = login();
  const [isClicked, setIsClicked] = useState(false);
  const { userid } = useParams();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [oldFormValues, setOldFormValues] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const { data } = useSelector((state) => state.userDetails);
  useEffect(() => {
    if (userid) {      
      setOldFormValues(data.find((item) => item.id === +`${userid}`))
    }
  }, [data]);
  useEffect(()=>{    
    setFormValues({...oldFormValues});
  },[oldFormValues])
  const handleChange = (e) => {
    const { name, value } = e.target;
    // update field values
    if (name === COUNTY_OPTIONS.COUNTRY) {
      setSelectedCountry(value);
      formValues.city = EMPTY_OPTION.CITY_NOT_SELECTED;
       formValues.state = EMPTY_OPTION.STATE_NOT_SELECTED;
    }
    if (name === COUNTY_OPTIONS.STATE) {
      setSelectedState(value);
      formValues.city = EMPTY_OPTION.CITY_NOT_SELECTED;
    }
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateData(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (userid) {
      dispatch(getLoginUser(userid));
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        // All the field data
        dispatch(updateUser(formValues));
        setTimeout(() => {
          navigate("/dashboard/home");
        }, 1000);
      }
    }
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // All the field data
      dispatch(saveUser(formValues));
      setIsClicked(true);
      // 👇️ redirect to / Users Page
      setTimeout(() => {
        navigate("/dashboard/userlist");
      }, 1000);
    }
  }, [formErrors]);
  const validateData = (values) => {
    const errors = {};
    if (!values?.userRole) {
      errors.userRole = "Select User Role";
    } else if (values.userRole === EMPTY_OPTION.ROLE_NOT_SELECTED) {
      errors.userRole = "Select User Role";
    }
    if (!values?.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values?.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values?.gender) {
      errors.gender = "Select Gender";
    }
    if (!values?.birthDay) {
      errors.birthDay = "Enter Birth Date is required";
    }
    if (!values?.mobile) {
      errors.mobile = "Mobile Number is required";
    } else if (!MOBILE_NO_REGEX.test(values.mobile)) {
      errors.mobile = "Enter Number only";
    } else if (values.mobile.length !== 10) {
      errors.mobile = "Mobile number not valid";
    }
    if (!values?.email) {
      errors.email = "Email Id is required";
    } else if (!MAIL_REGEX.test(values.email)) {
      errors.email = "Email is not valid";
    }
    if (!values?.address) {
      errors.address = "Address is required";
    }
    if (!values?.city) {
      errors.city = "City Name is required";
    } else if (values.city === EMPTY_OPTION.CITY_NOT_SELECTED) {
      errors.city = "City Name is required";
    }
    if (!values?.state) {
      errors.state = "State Name is required";
    } else if (values.state === EMPTY_OPTION.STATE_NOT_SELECTED) {
      errors.state = "State Name is required";
    }
    if (!values?.country) {
      errors.country = "Country Name is required";
    } else if (values.country === EMPTY_OPTION.COUNTRY_NOT_SELECTED) {
      errors.country = "Country Name is required";
    }
    if (!values?.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password much be more then 4 character";
    }
    return errors;
  };

  const availableState = COUNTRIES_DATA?.countries?.find(
    (country) => country.name === selectedCountry
  );
  const availableCities = availableState?.states?.find(
    (state) => state.name === selectedState
  );
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Sidebar />
      <div className="register">
        <h2 className="pageTitle">{userid ? "Profile" : "Create User"}</h2>

        <form className="userRegForm" onSubmit={handleSubmit}>
          <div className="regField">
            <label>Role</label>
            <select
              className="dropDown"
              name="userRole"
              value={formValues?.userRole}
              onChange={handleChange}
              disabled={userid}
            >
              <option>{`${
                userid ? formValues?.userRole : EMPTY_OPTION.ROLE_NOT_SELECTED
              }`}</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <p className="errorMsg">{formErrors.userRole}</p>
          </div>
          <div className="regField">
            <label>First Name*</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formValues?.firstName}
              onChange={handleChange}
            />

            <p className="errorMsg">{formErrors.firstName}</p>
          </div>
          <div className="regField">
            <label>Last Name*</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formValues?.lastName}
              onChange={handleChange}
            />
            <p className="errorMsg">{formErrors.lastName}</p>
          </div>
          <div className="regField">
            <label>Gender*</label>
            <div className="genderItem">
              <input
                type="radio"
                name="gender"
                id="male"
                value="Male"
                checked={formValues?.gender === "Male"}
                placeholder="Male"
                onChange={handleChange}
              />
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="Female"
                placeholder="Female"
                checked={formValues?.gender === "Female"}
                onChange={handleChange}
              />
              <label htmlFor="Female">Female</label>
            </div>
            <p className="errorMsg">{formErrors.gender}</p>
          </div>
          <div className="regField">
            <label>DOB*</label>
            <input
              type="date"
              name="birthDay"
              placeholder="DOB"
              value={formValues?.birthDay}
              onChange={handleChange}
            />
            <p className="errorMsg">{formErrors.birthDay}</p>
          </div>
          <div className="regField">
            <label>Mobile*</label>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formValues?.mobile}
              onChange={handleChange}
            />
            <p className="errorMsg">{formErrors.mobile}</p>
          </div>
          <div className="regField">
            <label>Email*</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues?.email}
              onChange={handleChange}
              readOnly={userid}
            />
            <p className="errorMsg">{formErrors.email}</p>
          </div>
          <div className="regField">
            <label>Address*</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formValues?.address}
              onChange={handleChange}
            />
            <p className="errorMsg">{formErrors.address}</p>
          </div>
          <div className="regField">
            <label>Country*</label>
            {/* <input
            type="text"
            name="Country"
            placeholder="Country"
            value={formValues?.Country}
            onChange={handleChange}
          /> */}
            <select
              className="dropDown"
              name="country"
              value={formValues?.country}
              onChange={handleChange}
            >
              <option>{EMPTY_OPTION.COUNTRY_NOT_SELECTED}</option>
              {COUNTRIES_DATA?.countries?.map((country, key) => {
                return (
                  <option value={country.name} key={key}>
                    {country.name}
                  </option>
                );
              })}
            </select>
            <p className="errorMsg">{formErrors.country}</p>
          </div>

          <div className="regField">
            <label>State*</label>
            {/* <input
            type="text"
            name="state"
            placeholder="State"
            value={formValues?.state}
            onChange={handleChange}
          /> */}
            <select
              className="dropDown"
              name="state"
              value={formValues?.state}
              onChange={handleChange}
            >
              <option>{`${
                userid ? formValues?.state : EMPTY_OPTION.STATE_NOT_SELECTED
              }`}</option>
              {availableState?.states.map((state, key) => {
                return (
                  <option value={state.name} key={key}>
                    {state.name}
                  </option>
                );
              })}
            </select>
            <p className="errorMsg">{formErrors.state}</p>
          </div>
          <div className="regField">
            <label>City*</label>
            {/* <input
            type="text"
            name="city"
            placeholder="City"
            value={formValues?.city}
            onChange={handleChange}
          /> */}
            <select
              className="dropDown"
              name="city"
              value={formValues?.city}
              onChange={handleChange}
            >
              <option>{`${
                userid ? formValues?.city : EMPTY_OPTION.CITY_NOT_SELECTED
              }`}</option>
              {availableCities?.cities.map((city, key) => {
                return (
                  <option value={city} key={key}>
                    {city}
                  </option>
                );
              })}
            </select>
            <p className="errorMsg">{formErrors.city}</p>
          </div>
          <div className="regField">
            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues?.password}
              onChange={handleChange}
            />
            <p className="errorMsg">{formErrors.password}</p>
          </div>
          {userid ? (
            <button className="userRegBtn">Update</button>
          ) : (
            <button className="userRegBtn" disabled={isClicked}>
              Create
            </button>
          )}
          {auth && role === USER_TYPES.ADMIN ? (
            <button className="userRegBtn" onClick={goBack}>
              Back
            </button>
          ) : (
            ""
          )}
        </form>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="success">User information has been updated</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
