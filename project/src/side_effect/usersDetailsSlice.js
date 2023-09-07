import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api_instance/apiInstance";
import { STATUS, BASE_URL, ERROR_CODE } from "../const/const";
const initialState = {
  user: "",
  status: "idle",
  token: "",
  data: [],
};
const usersDetailsSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = STATUS.PENDING;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCESSED;
        state.data = payload.users;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(getLoginUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCESSED;
        state.data = payload.users;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCESSED;
        const index = state.data.findIndex((user) => user?.id === +payload);
        state.data?.splice(index, 1);
      })
      .addCase(saveUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCESSED;
        if (!payload?.errorCode === ERROR_CODE) {
          state.data?.push(payload);
        }
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCESSED;
        const index = state.data?.findIndex(
          (user) => user.id === payload[0].id
        );
        state.data[index] = {
          ...state.data[index],
          ...payload,
        };
      })
      .addCase(userAuth.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCESSED;
        if (payload?.token) {
          state.token = payload.token;
          state.user = payload.user;
        }
      });
  },
});
export const { addUser } = usersDetailsSlice.actions;
export default usersDetailsSlice.reducer;
// async Function for API Calling
export const getUser = createAsyncThunk(
  "userDetails/getUser",
  async () => {
    const res = await axios.get(`${BASE_URL}/get`);
    return res?.data;
  }
);
export const getLoginUser = createAsyncThunk(
  "userDetails/getLoginUser",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/get/${id}`);
    return res?.data;
  }
);

export const deleteUser = createAsyncThunk(
  "userDetails/deleteUser",
  async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}`);
      return res.data.id;
    } catch (error) {
      console.log("OOPs found an error");
    }
  }
);
export const saveUser = createAsyncThunk(
  "userDetails/saveUser",
  async (userData) => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, userData);
      return res.data;
    } catch (error) {
      return {
        message: error.response.data.message,
        errorCode: error.response.data.status,
      };
    }
  }
);
export const updateUser = createAsyncThunk(
  "userDetails/updateUser",
  async (userData) => {
    try {
      const res = await axios.put(`put/${userData.id}`, userData);
      return res.data.user;
    } catch (error) {
      console.log("OOPs found an error");
    }
  }
);
export const userAuth = createAsyncThunk(
  "userDetails/userAuth",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, userData);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          id: res.data.id,
          token: res.data.access_token,
          userRole: res.data.userRole,
        })
      );
      return { token: res.data.access_token, user: userData.email };
    } catch (error) {
      return {
        message: error.response.data.message,
        errorCode: error.response.data.status,
      };
    }
  }
);
