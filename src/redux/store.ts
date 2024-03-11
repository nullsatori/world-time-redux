import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./slices/citiesSlice";
import timesReducer from "./slices/timesSlice";
export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    times: timesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
