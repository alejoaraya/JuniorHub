import { Dispatch } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";
import { getInfoUser } from "../../../helpers";
import { verifyToken } from "../../../helpers/verifyToken";
import { RootState } from "../../store";
import {
  checkingCredentials,
  login,
  logout,
  setUploadImage,
  updateProfile,
} from "./authSlice";
import Swal from "sweetalert2";

// ** LOGEO
export const startLogin = () => {
  return async (dispatch: Dispatch /* getState: () => RootState */) => {
    try {
      // const { uid } = getState().auth;
      // if (!uid) throw new Error("UID is undefined");
      const token = verifyToken();
      if (!token) return;

      // const payload = await verifyToken(token);
      // if (!payload) throw new Error("payload don't exist");
      // console.log(payload);

      const payload = await getInfoUser(token);
      console.log(payload);

      dispatch(
        login({
          description: payload.description,
          links: payload.links || [],
          mediaUrl: payload.mediaUrl,
          name: payload.name,
          technologies: payload.technologies || [],
          lastName: payload.lastName,
          email: payload.email,
          valorationEnum: payload.valorationEnum,
        })
      );
    } catch (error) {
      // dispatch(logout(error));
      console.log(error);
    }
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
      // console.log(res);
      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        dispatch(logout(data));
        // throw new Error("Error en la autenticación");
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
      if (!payload) throw new Error("payload don't exist");

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
      const newFreelancer = {
        email: email,
        password: password,
        name: name,
        lastName: lastName,
        role: 1,
      };

      const res = await fetch(
        "https://juniorhub.somee.com/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFreelancer),
        }
      );

      // const data = await res.json();

      console.log("res:", res);

      if (!res.ok) {
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
        const token = verifyToken();
        if (!token) return;

        const resp = await fetch("https://juniorhub.somee.com/api/cloudinary", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        // console.log(resp);

        const data = await resp.json();
        // console.log(data);
        if (!resp.ok) throw new Error("Couldn't upload image");

        const payload = await getInfoUser(token);

        payload.mediaUrl = data.url;

        console.log(payload);

        const cloudinaryPUT = await fetch(
          "https://juniorhub.somee.com/api/freelancers",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const dat = await cloudinaryPUT.json();
        // console.log(cloudinaryPUT);
        console.log(dat);

        dispatch(setUploadImage(data.url));
        Swal.fire("La imagen se a guardado", "", "success");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        Swal.fire("Hubo un error con la imagen", "", "error");
      }
    }
  };
};

export const startUpdateProfile = ({
  description,
  lastName,
  links: linksUpdated,
  mediaUrl,
  name,
  technologies,
}: User) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // dispatch(savingNewNote());

    try {
      const token = verifyToken();
      const { links } = getState().auth;
      // console.log("linksUpdated", linksUpdated);

      const newLinks = links.map((item) => {
        const update = linksUpdated?.find((u) => u.name === item.name);
        // console.log(`update ${update?.name}: `, update);

        if (update) {
          return { ...item, url: update.url };
        }
        return item;
      });

      // console.log("newLinks", newLinks);

      const newProfile = {
        name,
        lastName,
        mediaUrl,
        description,
        links: newLinks,
        technologies,
      };
      const res = await fetch("https://juniorhub.somee.com/api/freelancers", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile),
      });

      // console.log(newProfile);

      // console.log(res);
      const data = await res.json();
      // console.log(data);
      if (!res.ok) throw new Error();
      dispatch(
        updateProfile({
          description: data.description,
          valorationEnum: data.valorationEnum,
          email: data.email,
          lastName: data.lastName,
          links: data.links,
          mediaUrl: data.mediaUrl,
          name: data.name,
          technologies: data.technologies,
        })
      );
      Swal.fire("El perfil se actualizo!", "", "success");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire("Hubo un error en la actualizacion de perfil", "", "error");
    }
  };
};
