import { Dispatch } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";
import {
  checkingCredentials,
  login,
  logout,
  setUploadImage,
  updateProfile,
} from "./authSlice";

// ** LOGEO
export const startLogin = () => {
  return async (dispatch: Dispatch /* getState: () => RootState */) => {
    // const { uid } = getState().auth;
    // if (!uid) throw new Error("UID is undefined");
    const token = localStorage.getItem("token");
    if (!token) return;

    // const payload = await verifyToken(token);
    // if (!payload) throw new Error("payload don't exist");
    // console.log(payload);

    const res = await fetch(
      "https://juniorhub.somee.com/api/freelancers/current",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const payload = await res.json();
    console.log(payload);

    dispatch(
      login({
        description: payload.description,
        links: payload.links,
        mediaUrl: payload.mediaUrl,
        name: payload.name,
        technologies: payload.technologies,
        lastName: payload.lastName,
        email: payload.email,
        valorationEnum: payload.valorationEnum,
      })
    );
  };
};

export const startSignInWithEmailPassword = ({ email = "", password = "" }) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    try {
      // console.log({ email, password });

      const res = await fetch("https://juniorhub.somee.com/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        throw new Error("Error en la autenticación");
      }
      const token = data.token;
      localStorage.setItem("token", token);

      const userRes = await fetch(
        "https://juniorhub.somee.com/api/freelancers/current",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const payload = await userRes.json();
      console.log(payload);

      dispatch(
        login({
          description: payload.description,
          links: payload.links,
          mediaUrl: payload.mediaUrl,
          name: payload.name,
          technologies: payload.technologies,
          lastName: payload.lastName,
          email: payload.email,
          valorationEnum: payload.valorationEnum,
        })
      );

      if (!payload) throw new Error("payload don't exist");
    } catch (error) {
      throw new Error("Error en la autenticación: " + error);
    }
  };
};

export const startCreatingUserWithEmailPassword = ({
  email = "",
  password = "",
  firstName: name = "",
  lastName = "",
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    try {
      const resRegister = await fetch(
        "https://juniorhub.somee.com/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, lastName, role: 1 }),
        }
      );

      // const data = await res.json();

      // console.log("res:", res);

      if (!resRegister.ok) {
        // console.error("error data:", data);
        return;
      }
      // console.log("well data :", data);
      dispatch(
        login({
          valorationEnum: 0,
          description: "",
          links: [],
          mediaUrl: "",
          technologies: [],
          email,
          name,
          lastName,
        })
      );
    } catch (error) {
      console.log(error);
    }

    //TODO: if (!ok) return dispatch(logout(data));

    //* **CHECK IT**
    //* const res = await registerUserWithEmailAndPassword({
    //*   email,
    //*   password,
    //*   displayName,
    //* });

    //* if (!res || res.errorMessage === undefined)
    //*   throw new Error("variables of $res are empties");

    //* const { photoURL, uid, ok, errorMessage } = res;
  };
};

export const startLogOutUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
    localStorage.removeItem("token");
    // await logOutUserFirebase();
    dispatch(logout(""));
  };
};

// ** LOGICA
export const startUploadImages = (files: FileList) => {
  return async (dispatch: Dispatch) => {
    if (files.length <= 0) throw new Error("$files is empty");

    // dispatch(setSaving());

    console.log("startUploadImages", files);

    for (const file of files) {
      const formData = new FormData();

      formData.append("media", file);
      formData.append("type", "image/jpeg");

      try {
        const userToken = localStorage.getItem("token");

        const resp = await fetch("https://juniorhub.somee.com/api/cloudinary", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: formData,
        });
        // console.log(resp);

        const data = await resp.json();
        // console.log(data);
        if (!resp.ok) throw new Error("Couldn't upload image");

        const cloudinaryPUT = await fetch(
          "https://juniorhub.somee.com/api/freelancers",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mediaUrl: data.url,
            }),
          }
        );
        const dat = await cloudinaryPUT.json();
        console.log(cloudinaryPUT);
        console.log(dat);

        dispatch(setUploadImage(data.url));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const startUpdateProfile = ({
  email,
  description,
  lastName,
  links,
  mediaUrl,
  name,
  technologies,
  valorationEnum,
}: User) => {
  return async (dispatch: Dispatch) => {
    // dispatch(savingNewNote());

    try {
      const userToken = localStorage.getItem("token");

      const res = await fetch("https://juniorhub.somee.com/api/freelancers", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastName,
          mediaUrl,
          description,
          links,
          technologies,
        }),
      });

      console.log(res);
      const { data } = await res.json();
      console.log(data);
      dispatch(
        updateProfile({
          description,
          valorationEnum,
          email,
          lastName,
          links,
          mediaUrl,
          name,
          technologies,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
