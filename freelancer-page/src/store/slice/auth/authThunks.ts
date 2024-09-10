import { Dispatch } from "@reduxjs/toolkit";
import { logOutUserFirebase } from "../../../firebase/providers";
import { verifyToken } from "../../../helpers/verifyToken";
import { checkingCredentials, login, logout } from "./authSlice";

export const startLogin = () => {
  return async (dispatch: Dispatch /* getState: () => RootState */) => {
    // const { uid } = getState().auth;
    // if (!uid) throw new Error("UID is undefined");
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = await verifyToken(token);
    if (!payload) throw new Error("payload don't exist");
    // console.log(payload);

    dispatch(
      login({
        description: payload.description,
        links: payload.links,
        mediaUrl: payload.mediaUrl,
        name: payload.name,
        technologies: payload.technologies,
        lastName: payload.lastName,
        email: payload.email,
      })
    );
  };
};
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

export const startUploadImages = (files: FileList) => {
  return async (/* dispatch: Dispatch */) => {
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
        console.log(resp);

        const data = await resp.json();
        console.log(data);
        if (!resp.ok) throw new Error("Couldn't upload image");

        // dispatch(setUploadImages(data.secure_url));
      } catch (error) {
        console.error(error);
      }
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
      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        throw new Error("Error en la autenticación");
      }
      const token = data.token;
      localStorage.setItem("token", token);

      const payload = await verifyToken(token);
      // console.log(payload);

      if (!payload) throw new Error("payload don't exist");

      dispatch(
        login({
          description: payload.description,
          links: payload.links,
          mediaUrl: payload.mediaUrl,
          name: payload.name,
          technologies: payload.technologies,
          email: payload.email,
          lastName: payload.lastName,
        })
      );

      // return token;
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

      if (!res.ok) {
        // console.error("error data:", data);
        return;
      }
      // console.log("well data :", data);
      dispatch(
        login({
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
    await logOutUserFirebase();
    dispatch(logout(""));
  };
};
