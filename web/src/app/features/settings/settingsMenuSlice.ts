import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SettingsMenuItem {
  ACCOUNT = "Account",
  CONNECTIONS = "Connections",
}

interface SettingsMenuState {
  selected: SettingsMenuItem;
}

const initialState: SettingsMenuState = {
  selected: SettingsMenuItem.ACCOUNT,
};

const settingsMenuSlice = createSlice({
  name: "settingsMenuSlice",
  initialState,
  reducers: {
    select: (state, action: PayloadAction<SettingsMenuItem>) => {
      const item = action.payload;
      state.selected = item;
    },
  },
});

export const { select } = settingsMenuSlice.actions;

export default settingsMenuSlice.reducer;
