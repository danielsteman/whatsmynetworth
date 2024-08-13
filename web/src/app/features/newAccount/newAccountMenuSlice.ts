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
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { toggleMenu } = newAccountMenuSlice.actions;

export default newAccountMenuSlice.reducer;
