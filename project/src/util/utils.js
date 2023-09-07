export const login = () => {
  let authUser = JSON.parse(localStorage.getItem("auth"));
  if (authUser) {
    return {
      auth: true,
      token: authUser.token,
      id: authUser.id,
      userRole: authUser.userRole,
    };
  } else {
    return { auth: false, token: "", user: "" };
  }
};
export const getLastIndex = (currentPage, RECORDS_PER_PAGE) =>
  currentPage * RECORDS_PER_PAGE;
export const getFirstIndex = (lastIndex, RECORDS_PER_PAGE) =>
  lastIndex - RECORDS_PER_PAGE;
export const getNoPage = (data, RECORDS_PER_PAGE) =>
  Math.ceil(data.length / RECORDS_PER_PAGE);
export const getPageNumbers = (noPage) =>
  [...Array(noPage + 1).keys()].slice(1);
