import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    email: "Email",
  },
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setStatus: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData, setStatus } = authSlice.actions;

export default authSlice.reducer;
