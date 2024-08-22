import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import transferSlice from "./slices/transferSlice";

export const store = configureStore({
  reducer: {
    transfer: transferSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
