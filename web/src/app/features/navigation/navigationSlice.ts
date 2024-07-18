import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum NavigationTabs {
  DASHBOARD = "Dashboard",
  ACCOUNTS = "Accounts",
  TRANSACTIONS = "Transactions",
}

interface NavigationState {
  currentTab: NavigationTabs;
}

const initialState: NavigationState = {
  currentTab: NavigationTabs.DASHBOARD,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<NavigationTabs>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setTab } = navigationSlice.actions;

export default navigationSlice.reducer;
