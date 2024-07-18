import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum PortfolioQuickMenuDropdowns {
  PAYMENTSACCOUNT = "Payments Account",
  SAVINGSACCOUNT = "Savings Account",
}

interface PortfolioQuickMenuState {
  droppedDownItems: {
    [key in PortfolioQuickMenuDropdowns]: boolean;
  };
}

const initialState: PortfolioQuickMenuState = {
  droppedDownItems: {
    [PortfolioQuickMenuDropdowns.PAYMENTSACCOUNT]: false,
    [PortfolioQuickMenuDropdowns.SAVINGSACCOUNT]: false,
  },
};

const portfolioQuickMenuSlice = createSlice({
  name: "portfolioQuickMenu",
  initialState,
  reducers: {
    toggleDropdown: (
      state,
      action: PayloadAction<PortfolioQuickMenuDropdowns>
    ) => {
      const dropdown = action.payload;
      state.droppedDownItems[dropdown] = !state.droppedDownItems[dropdown];
    },
  },
});

export const { toggleDropdown } = portfolioQuickMenuSlice.actions;

export default portfolioQuickMenuSlice.reducer;
