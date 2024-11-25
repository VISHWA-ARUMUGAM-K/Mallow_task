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

// Action creators are generated for each case reducer function
export const { setFormData } = authSlice.actions;

export default authSlice.reducer;
