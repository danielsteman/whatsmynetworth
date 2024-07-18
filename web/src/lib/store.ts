import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../app/features/navigation/navigationSlice";
import portfolioQuickMenuReducer from "../app/features/portfolioQuickMenu/portfolioQuickMenuSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navigation: navigationReducer,
      portfolioMenu: portfolioQuickMenuReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
