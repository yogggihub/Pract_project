import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MAIL_REGEX, ERROR_CODE } from "../const/const";
import { userAuth } from "../side_effect/usersDetailsSlice";
export default function Login() {
  const [formValues, setFormValues] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [apiErrorMsg, setApiErrorMsg] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(userAuth(formValues)).then(({ payload }) => {
        if (payload?.errorCode === ERROR_CODE) {
          setApiErrorMsg(payload.message);
        } else {
          navigate("/dashboard/home");
        }
      });
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validateData(formValues));
  };
  const validateData = (values) => {
    const errors = {};
    if (!values?.email) {
      errors.email = "Enter Register Email Id";
    } else if (!MAIL_REGEX.test(values.email)) {
      errors.email = "Email is not valid";
    }
    if (!values?.password) {
      errors.password = "Enter Password";
    }
    return errors;
  };

  return (
    <div className="login">
      <h2 className="pageTitle">Login Form</h2>
      <form className="userLoginForm" onSubmit={handleSubmit}>
        <div className="loginField">
          <label>Email*</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formValues?.email}
            onChange={handleChange}
          />
          <p className="errorMsg">{formErrors.email}</p>
        </div>
        <div className="loginField">
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
        <button className="userLoginBtn">Login</button>
      </form>
      <p>{apiErrorMsg}</p>
    </div>
  );
}
