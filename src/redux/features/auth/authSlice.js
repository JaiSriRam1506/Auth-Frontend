import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
/* Import the above 2 method */
import authService from "./authServices";
import toast from "react-hot-toast";

/* Create Initial State(in the form of object of variable) i.e variable which will act like as useState variable */
const initialState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// 3rd Creating Async Thunk middleware Function
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      console.log("Failed at Registration page in redux:", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Failed at User Registration";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* 2nd Create Slice */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /*  Reducers will be a object of multiple functions */
    /* this is a function */
    AUTH_RESET(state) {
      /*  Keep Function name in Capital to differenciate the normal component fun fro m redux reducers func
       */
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    /*  to Handle the AXIOS/fetch call  which will have 3 state pending fullfield, rejected */
    builder
      /* Register Function */
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Action PayLoad:", action.payload);
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        state.user = null;
        toast.error(action.payload.message);
      });
  },
});

export default authSlice.reducer;
export const { AUTH_RESET } = authSlice.actions;
