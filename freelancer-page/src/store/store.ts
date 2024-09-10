import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth";
import { offerSlice } from "./slice/offer";
import { uiSlice } from "./slice/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    offer: offerSlice.reducer,
    ui: uiSlice.reducer,
    // [juniorHubApi.reducerPath]: juniorHubApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(juniorHubApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
