import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewAccountMenuState {
  open: boolean;
}

const initialState: NewAccountMenuState = {
  open: false,
};

const newAccountMenuSlice = createSlice({
  name: "newAccountMenu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleMenu } = newAccountMenuSlice.actions;

export default newAccountMenuSlice.reducer;
