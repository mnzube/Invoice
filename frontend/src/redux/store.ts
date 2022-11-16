import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { rootReducer } from "./Slices/RootReducer";

const store = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
export default store;
