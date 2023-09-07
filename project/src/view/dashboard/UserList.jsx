import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, deleteUser } from "../../side_effect/usersDetailsSlice";
import { STATUS, SEARCH_KEYS, RECORDS_PER_PAGE } from "../../const/const";
import Sidebar from "./Sidebar";
import {
  login,
  getLastIndex,
  getFirstIndex,
  getNoPage,
  getPageNumbers,
} from "../../util/utils";
import Pagination from "../components/Pagination";
export default function ViewUserDetails() {
  const { auth, userRole, id: userId } = login();
  const [searchQuery, setSearchQuery] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const dispatch = useDispatch();
  const lastIndex = getLastIndex(currentPage, RECORDS_PER_PAGE);
  const firstIndex = getFirstIndex(lastIndex, RECORDS_PER_PAGE);
  const { data, status } = useSelector((state) => state.userDetails);
  const usersDetails = data.slice(firstIndex, lastIndex);
  const noPage = getNoPage(data, RECORDS_PER_PAGE);
  const numbers = getPageNumbers(noPage);
  const prevPage = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== noPage) {
      setcurrentPage(currentPage + 1);
    }
  };
  const changeCurrentPage = (id) => {
    setcurrentPage(id);
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const deleteUsers = (id) => {
    if (userId === +id) {
      window.alert("Can't delete managed users");
    } else {
      var isItConfirm = window.confirm("Want to delete?");
      if (isItConfirm) {
        dispatch(deleteUser(`${id}`));
        setcurrentPage(1);
      }
    }
  };
  // if (auth && role !== USER_TYPES.ADMIN) {
  //   return navigate(`/dashboard/updateuser/${id}`);
  // }
  if (status === STATUS.LOADING) {
    return (
      <div className="userList">
        <p>Loading....</p>
      </div>
    );
  }
  if (status === STATUS.ERROR) {
    return (
      <div className="userList">
        <p>Some thing, went wrong, try again</p>
      </div>
    );
  }
  const filterData = () => {
    if (searchQuery?.length > 0) {
      return data.filter((item) => {
        return searchQuery?.toLowerCase() === undefined
          ? item
          : SEARCH_KEYS.some((key) =>
              item[key].toLowerCase().includes(searchQuery.toLowerCase())
            );
      });
    }
    return usersDetails.filter((item) => {
      return searchQuery?.toLowerCase() === undefined
        ? item
        : SEARCH_KEYS.some((key) =>
            item[key].toLowerCase().includes(searchQuery.toLowerCase())
          );
    });
  };
  const userData = () => {
    if (usersDetails?.length > 0) {
      // return usersDetails
      //   .filter((item) => {
      //     return searchQuery?.toLowerCase() === undefined
      //       ? item
      //       : SEARCH_KEYS.some((key) =>
      //           item[key].toLowerCase().includes(searchQuery.toLowerCase())
      //         );
      //   })
      return filterData()?.map((user, index) => (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.userRole}</td>
          <td>{user.firstName} </td>
          <td>{user.lastName} </td>
          <td>{user.gender}</td>
          <td>{user.birthDay}</td>
          <td>{user.mobile}</td>
          <td>{user.email}</td>
          <td>{user.city}</td>
          <td>
            <Link
              to={`/dashboard/viewuserdetails/${user.id}`}
              className="viewbtn"
            >
              View
            </Link>
            <Link to={`/dashboard/updateuser/${user.id}`} className="editbtn">
              Edit
            </Link>
            <Link
              to=""
              className="deletebtn"
              onClick={() => deleteUsers(`${user.id}`)}
            >
              Delete
            </Link>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan="8">No Data Found</td>
        </tr>
      );
    }
  };

  return (
    <>
      <Sidebar />
      <div className="userList">
        <h2 className="pageTitle">Users</h2>
        <div className="header_wrap">
          <div className="tb_search">
            <input
              type="text"
              name="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchBox"
              id="search_input_all"
              placeholder="Search.."
            />
          </div>
          <div className="navBar">
            <Link to="/dashboard/createuser/">
              <li className="navBarItem">Create</li>
            </Link>
          </div>
        </div>
        <table className="table-container">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Role</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>City</th>
              <th colSpan="3" className="actionbtn">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{userData()}</tbody>
        </table>
        <Pagination
          numbers={numbers}
          prevPage={prevPage}
          currentPage={currentPage}
          nextPage={nextPage}
          changeCurrentPage={changeCurrentPage}
        />
      </div>
    </>
  );
}
