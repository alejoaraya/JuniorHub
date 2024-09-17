import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";

interface AuthState extends User {
  status?: "checking" | "not-authenticated" | "autenticated";
  errorMessage?: string | null | undefined;
}

const initialState: AuthState = {
  status: "not-authenticated",
  offers: [],
  mediaUrl: "",
  valorationEnum: 0,
  name: "",
  lastName: "",
  email: "",
  errorMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.status = "autenticated";
      state.offers = action.payload.offers;
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.valorationEnum = action.payload.valorationEnum;
      state.mediaUrl = action.payload.mediaUrl;
      state.errorMessage = null;
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.mediaUrl = action.payload.mediaUrl;
    },
    logout: (state, action: PayloadAction<string>) => {
      state.status = "not-authenticated";
      state.offers = null;
      state.name = null;
      state.lastName = null;
      state.email = null;
      state.valorationEnum = null;
      state.mediaUrl = null;
      state.errorMessage = action.payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    setUploadImage: (state, action: PayloadAction<string>) => {
      state.mediaUrl = action.payload;
    },
  },
});

export const {
  login,
  logout,
  checkingCredentials,
  updateProfile,
  setUploadImage,
} = authSlice.actions;
