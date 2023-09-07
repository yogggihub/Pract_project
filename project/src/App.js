import { Route, Routes } from "react-router-dom";
import "./assets/style.css";
import Header from "./view/dashboard/Header";
import UserList from "./view/dashboard/UserList";
import UpdateUser from "./view/dashboard/UpdateUser";
import ViewUserDetails from "./view/dashboard/ViewUserDetails";
import PrivateRoute from "./routes/PrivateRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Login from "./view/Login";
import Error from "./view/Error";
import Permissiondenied from "./view/Permissiondenied";
import Home from "./view/dashboard/Home";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="denied" element={<Permissiondenied />} />
          <Route
            path="dashboard/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard/userlist/*"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/createuser"
            element={
              <PrivateRoute>
                <UpdateUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/updateuser/:userid"
            element={
              <ProtectedRoutes>
                <UpdateUser />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard/viewuserdetails/:userid"
            element={
              <PrivateRoute>
                <ViewUserDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
