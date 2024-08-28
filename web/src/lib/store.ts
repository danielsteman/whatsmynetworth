import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../app/features/navigation/navigationSlice";
import portfolioQuickMenuReducer from "../app/features/portfolioQuickMenu/portfolioQuickMenuSlice";
import newAccountMenuReducer from "../app/features/newAccount/newAccountMenuSlice";
import settingsMenuReducer from "../app/features/settings/settingsMenuSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navigation: navigationReducer,
      portfolioMenu: portfolioQuickMenuReducer,
      newAccountMenu: newAccountMenuReducer,
      settingsMenu: settingsMenuReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
