import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Link, Technology, User } from "../../../@types/types";

interface AuthState extends User {
  status?: "checking" | "not-authenticated" | "autenticated";
  name: string | null;
  lastName: string | null;
  mediaUrl: string | null;
  description: string | null;
  links: Link[];
  technologies: Technology[];
  errorMessage?: string | null | undefined;
}

const initialState: AuthState = {
  status: "not-authenticated",
  name: "",
  lastName: "",
  mediaUrl: "",
  description: "",
  links: [],
  technologies: [],
  errorMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.status = "autenticated";
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.mediaUrl = action.payload.mediaUrl;
      state.description = action.payload.description;
      state.links = action.payload.links;
      state.technologies = action.payload.technologies;
      state.errorMessage = null;
    },
    logout: (state, action: PayloadAction<string>) => {
      state.status = "not-authenticated";
      state.name = null;
      state.lastName = null;
      state.mediaUrl = null;
      state.description = null;
      state.links = [];
      state.technologies = [];
      state.errorMessage = action.payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
