import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MenuStep = 0 | 1;

interface NewAccountMenuState {
  open: boolean;
  step: MenuStep;
}

const initialState: NewAccountMenuState = {
  open: false,
  step: 0,
};

const newAccountMenuSlice = createSlice({
  name: "newAccountMenu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.open = !state.open;
    },
    setStep: (state, action: PayloadAction<MenuStep>) => {
      state.step = action.payload;
    },
  },
});

export const { toggleMenu, setStep } = newAccountMenuSlice.actions;

export default newAccountMenuSlice.reducer;
