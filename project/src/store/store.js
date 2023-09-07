import { configureStore } from "@reduxjs/toolkit";
import usersDetailsSlice from "../side_effect/usersDetailsSlice";
const store = configureStore({
  reducer: {
    userDetails: usersDetailsSlice,
  },
});
export default store;
