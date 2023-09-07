export const BASE_URL = "http://localhost:5000/api/auth";
export const MAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const MOBILE_NO_REGEX = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
);
export const USER_TYPES = {
  USER: "User",
  ADMIN: "Admin",
};
export const STATUS = {
  PENDING: "Loading",
  SUCCESSED: "SUCCESSED",
  ERROR: "Error",
};
export const SEARCH_KEYS = [
  "userRole",
  "firstName",
  "lastName",
  "gender",
  "birthDay",
  "mobile",
  "email",
  "address",
  "city",
  "state",
  "country",
];
export const RECORDS_PER_PAGE = 4;
export const EMPTY_OPTION = {
  COUNTRY_NOT_SELECTED: "--Choose Country--",
  STATE_NOT_SELECTED: "--Choose State--",
  CITY_NOT_SELECTED: "--Choose City--",
  ROLE_NOT_SELECTED: "--Select Role--",
};
export const ERROR_CODE = 401;
export const COUNTY_OPTIONS = {
  COUNTRY: "country",
  STATE: "state",
  CITY: "city",
};
