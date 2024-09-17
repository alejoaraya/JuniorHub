import { Dispatch } from "@reduxjs/toolkit";
import { verifyToken } from "../../../helpers";
import {
  checkingCredentials,
  login,
  logout,
  setUploadImage,
  updateProfile,
} from "./authSlice";
import { User } from "../../../@types/types";
import { getInfoUser } from "../../../helpers/getInfoUser";

// export const checkingAuthentication = ({ email = "", password = "" }) => {
//   return async (dispatch: Dispatch) => {
//     dispatch(checkingCredentials());
//     dispatch(createAnAccount(email, password));
//   };
// };

// export const startGoogleSignIn = () => {
//   return async (dispatch: Dispatch) => {
//     dispatch(checkingCredentials());
//     const result = await signInWithGoogle();

//     if (result?.errorMessage === undefined)
//       throw new Error("result is undefined");

//     if (!result?.ok) return dispatch(logout(result.errorMessage));

//     dispatch(
//       login({
//         displayName: result.displayName,
//         email: result.email,
//         photoURL: result.photoURL,
//         uid: result.uid,
//       })
//     );
//   };
// };

export const startLogin = () => {
  return async (dispatch: Dispatch /* getState: () => RootState */) => {
    // const { uid } = getState().auth;
    // if (!uid) throw new Error("UID is undefined");
    try {
      const token = verifyToken();

      const res = await fetch(
        "https://juniorhub.somee.com/api/employer/current",
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
          offers: payload.offers,
          mediaUrl: payload.mediaUrl,
          email: payload.email,
          valorationEnum: payload.valorationEnum,
          name: payload.name,
          lastName: payload.lastName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSignInWithEmailPassword = ({ email = "", password = "" }) => {
  return async (dispatch: Dispatch) => {
    // dispatch(checkingCredentials());
    // const result = await signInWithEmailPassword({ email, password });
    try {
      const res = await fetch("https://juniorhub.somee.com/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(logout(data));

        // throw new Error("Error en la autenticación");
      }
      const token = data.token;
      localStorage.setItem("token", token);

      const user = await fetch(
        "https://juniorhub.somee.com/api/employer/current",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const payload = await user.json();
      console.log(payload);
      if (!payload) throw new Error("payload don't exist");

      dispatch(
        login({
          offers: payload.offers,
          valorationEnum: payload.valorationEnum,
          mediaUrl: payload.mediaUrl,
          email: payload.email,
          name: payload.name,
          lastName: payload.lastName,
        })
      );

      // return token;
    } catch (error) {
      throw new Error("Error en la autenticación: " + error);
    }

    // if (result?.errorMessage === undefined)
    //   throw new Error("result is undefined");

    // if (!result?.ok) return dispatch(logout(result.errorMessage));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email = "",
  password = "",
  firstName: name = "",
  lastName = "",
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(checkingCredentials());
      const res = await fetch(
        "https://juniorhub.somee.com/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, lastName, role: 0 }),
        }
      );
      // const data = await res.json();

      // console.log("res:", res);
      // console.log("res:", await res.json());

      if (!res.ok) throw new Error();

      // const payload = await getInfoUser(token)

      // console.log("well data :", data);
      dispatch(
        login({
          mediaUrl: "",
          offers: [],
          valorationEnum: 0,
          email,
          name,
          lastName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const startLogOutUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    localStorage.removeItem("token");
    dispatch(logout(""));
  };
};

export const startUpdateProfile = ({
  email,
  lastName,
  mediaUrl,
  name,
}: User) => {
  return async (dispatch: Dispatch) => {
    // dispatch(savingNewNote());

    try {
      const token = verifyToken();
      if (!token) throw new Error();

      const newProfile = {
        name,
        lastName,
        email,
        mediaUrl,
      };

      // console.log(newProfile);

      const res = await fetch("https://juniorhub.somee.com/api/employer", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile),
      });

      if (!res.ok) throw new Error();

      dispatch(
        updateProfile({
          email,
          lastName,
          mediaUrl,
          name,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const startUploadImages = (files: FileList) => {
  return async (dispatch: Dispatch) => {
    if (files.length <= 0) throw new Error("$files is empty");

    // dispatch(setSaving());

    // console.log("startUploadImages", files);

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

        const newProfile = {
          mediaUrl: data.url,
          email: payload.email,
          name: payload.name,
          lastName: payload.lastName,
        };
        // payload.mediaUrl = data.url;

        // console.log(payload);

        const cloudinaryPUT = await fetch(
          "https://juniorhub.somee.com/api/employer",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProfile),
          }
        );
        const dat = await cloudinaryPUT.json();
        // console.log(cloudinaryPUT);
        console.log(dat);

        dispatch(setUploadImage(data.url));
      } catch (error) {
        console.error(error);
      }
    }
  };
};
