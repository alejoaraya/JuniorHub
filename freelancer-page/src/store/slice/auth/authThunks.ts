import { Dispatch } from "@reduxjs/toolkit";
import {
  logOutUserFirebase,
  registerUserWithEmailAndPassword,
  signInWithEmailPassword,
  signInWithGoogle,
} from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

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
  return async (dispatch: Dispatch) => {
    if (files.length <= 0) throw new Error("$files is empty");

    // dispatch(setSaving());

    console.log("startUploadImages", files);

    for (const file of files) {
      const formData = new FormData();

      formData.append("media", file);
      formData.append("type", "image/jpeg");

      try {
        const resp = await fetch("https://juniorhub.somee.com/api/cloudinary", {
          method: "POST",
          headers: {
            accept: "text/plain",
            "Content-Type": "multipart/form-data",
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
    const result = await signInWithEmailPassword({ email, password });

    if (result?.errorMessage === undefined)
      throw new Error("result is undefined");

    if (!result?.ok) return dispatch(logout(result.errorMessage));

    dispatch(
      login({
        displayName: result.displayName,
        email: result.email,
        photoURL: result.photoURL,
        uid: result.uid,
      })
    );
  };
};

export const startCreatingUserWithEmailPassword = ({
  email = "",
  password = "",
  displayName = "",
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());

    const res = await registerUserWithEmailAndPassword({
      email,
      password,
      displayName,
    });

    if (!res || res.errorMessage === undefined)
      throw new Error("variables of $res are empties");

    const { photoURL, uid, ok, errorMessage } = res;

    if (!ok) return dispatch(logout(errorMessage));

    dispatch(
      login({
        email,
        displayName,
        photoURL,
        uid,
      })
    );
  };
};

export const startLogOutUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
    await logOutUserFirebase();
    dispatch(logout(""));
  };
};
