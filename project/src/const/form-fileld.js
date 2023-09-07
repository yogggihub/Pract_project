// Intial Form values for form data
export const INITIAL_FORM_VALUES = {
  userRole: "",
  firstName: "",
  lastName: "",
  gender: "",
  birthDay: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  password: "",
};
export const COUNTRIES_DATA = {
  countries: [
    {
      name: "India",
      states: [
        {
          name: "Maharashtra",
          cities: ["Pune", "New Mumbai", "Mumbai", "Nagpur"],
        },
        { name: "Delhi", cities: ["Delhi", "New Delhi"] },
        {
          name: "Gujarat",
          cities: ["Surat", "Ahmedabad", "Bhavnagar", "Rajkot", "Vadodara"],
        },
      ],
    },
    {
      name: "Germany",
      states: [
        {
          name: "Germany State",
          cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
        },
      ],
    },

    { name: "USA", states: [{ name: "USA State", cities: ["Downers Grove"] }] },
  ],
};
