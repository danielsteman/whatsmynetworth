import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Tabs {
  DASHBOARD = "Dashboard",
  ACCOUNTS = "Accounts",
  TRANSACTIONS = "Transactions",
}

interface NavigationState {
  currentTab: Tabs;
}

const initialState: NavigationState = {
  currentTab: Tabs.DASHBOARD,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<Tabs>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setTab } = navigationSlice.actions;

export default navigationSlice.reducer;
