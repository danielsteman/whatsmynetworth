import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../app/features/navigation/navigationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navigation: navigationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
