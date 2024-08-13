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
    setTab: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setTab } = newAccountMenuSlice.actions;

export default newAccountMenuSlice.reducer;
