import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Link, Technology, User } from "../../../@types/types";

interface AuthState extends User {
  status?: "checking" | "not-authenticated" | "autenticated";
  name: string | null;
  lastName: string | null;
  mediaUrl: string | null;
  description: string | null;
  email: string | null;
  valorationEnum: number | null;
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
  email: "",
  links: [],
  technologies: [],
  errorMessage: "",
  valorationEnum: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.status = "autenticated";
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.mediaUrl = action.payload.mediaUrl || initialState.mediaUrl;
      state.valorationEnum = action.payload.valorationEnum;
      state.email = action.payload.email;
      state.description =
        action.payload.description || initialState.description;
      state.links = action.payload.links || initialState.links;
      state.technologies =
        action.payload.technologies || initialState.technologies;
      state.errorMessage = null;
    },
    logout: (state, action: PayloadAction<string>) => {
      state.status = "not-authenticated";
      state.name = null;
      state.email = null;
      state.lastName = null;
      state.valorationEnum = null;
      state.mediaUrl = null;
      state.description = null;
      state.links = [];
      state.technologies = [];
      state.errorMessage = action.payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.description = action.payload.description;
      // state.email = action.payload.email;
      state.lastName = action.payload.lastName;
      state.mediaUrl = action.payload.mediaUrl;
      // state.valorationEnum = action.payload.valorationEnum;
      state.name = action.payload.name;
      state.links = action.payload.links || [];
      state.technologies = action.payload.technologies || [];
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
