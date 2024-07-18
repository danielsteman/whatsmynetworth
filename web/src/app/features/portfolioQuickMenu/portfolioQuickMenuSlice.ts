import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum PortfolioQuickMenuTabs {
  PAYMENTSACCOUNT = "Payments Account",
  SAVINGSACCOUNT = "Savings Account",
}

interface PortfolioQuickMenuState {
  currentTab: PortfolioQuickMenuTabs;
}

const initialState: PortfolioQuickMenuState = {
  currentTab: PortfolioQuickMenuTabs.PAYMENTSACCOUNT,
};

const portfolioQuickMenuSlice = createSlice({
  name: "portfolioQuickMenu",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<PortfolioQuickMenuTabs>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setTab } = portfolioQuickMenuSlice.actions;

export default portfolioQuickMenuSlice.reducer;
