import { Dispatch } from "@reduxjs/toolkit";

import { Offer } from "../../../@types/types";
import { RootState } from "../../store";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setOffers,
  // setUploadImages,
  udpateNote,
} from "./offerSlice";
import { loadOffers } from "../../../helpers/loadOffers";
import Swal from "sweetalert2";
import { verifyToken } from "../../../helpers/verifyToken";

export const startCreationOffer = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // const { uid } = getState().auth;
    const { offers } = getState().offer;

    dispatch(savingNewNote());

    const newOffer: Offer = {
      id: offers.length + 1,
      title: "New title",
      description: "Dolore minim esse culpa ullamco.",
      price: 0,
      estimatedTime: 0,
      state: 0,
      difficult: 0,
      technologies: [],
    };

    // const newDoc = await doc(collection(FirebaseDB, `${uid}/offer/notes/`));

    // await setDoc(newDoc, newNote);

    // newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newOffer));
    dispatch(setActiveNote(newOffer));
  };
};

// export const startLoadingNotes = () => {
//   return async (dispatch: Dispatch, getState: () => RootState) => {
//     const { uid } = getState().auth;
//     if (!uid) throw new Error("UID is undefined");

//     const res = await loadNotes(uid);
//     dispatch(setNotes(res));
//   };
// };

export const startUpdateNote = ({
  title,
  description,
  price,
  estimatedTime,
  state,
  difficult,
  technologies: technology,
}: Offer) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(savingNewNote());

    // const { uid } = getState().auth;
    const { offerActive: noteActive } = getState().offer;
    if (!noteActive) throw new Error("noteActive is empty");

    // const noteForFirebase = {
    //   ...noteActive,
    //   title,
    //   body,
    // };
    // delete noteForFirebase.id;

    // try {
    //   const docRef = doc(FirebaseDB, `${uid}/offer/notes/${noteActive?.id}`);
    //   await setDoc(docRef, noteForFirebase, { merge: true });
    // } catch (error) {
    //   console.log(error);
    // }

    dispatch(
      udpateNote({
        id: noteActive.id,
        title: title,
        description: description,
        price: price || noteActive.price,
        estimatedTime: estimatedTime || noteActive.estimatedTime,
        state: state || noteActive.state,
        difficult: difficult || noteActive.difficult,
        technologies: technology || noteActive.technologies,
      })
    );
  };
};

export const startDeleteNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(savingNewNote());
    const { offerActive: noteActive } = getState().offer;
    // const { uid } = getState().auth;

    // const docRef = doc(FirebaseDB, `${uid}/offer/notes/${noteActive?.id}`);
    // await deleteDoc(docRef);

    dispatch(deleteNoteById(noteActive?.id as number));
  };
};

// export const startUploadImages = (files: FileList) => {
//   return async (dispatch: Dispatch) => {
//     if (files.length <= 0) throw new Error("$files is empty");

//     dispatch(setSaving());

//     console.log("startUploadImages", files);

//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("upload_preset", "offer-app");
//       formData.append("file", file);

//       try {
//         const resp = await fetch(
//           "https://api.cloudinary.com/v1_1/react-exercises/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (!resp.ok) throw new Error("Couldn't upload image");
//         const data = await resp.json();

//         dispatch(setUploadImages(data.secure_url));
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };
// };

export const startLoadingOffers = () => {
  return async (dispatch: Dispatch) => {
    const res = await loadOffers();

    dispatch(setOffers(res));
  };
};
export const startApplyOffer = () => {
  return async (_dispatch: Dispatch, getState: () => RootState) => {
    const { offerActive } = getState().offer;

    try {
      const token = verifyToken();

      const res = await fetch("https://juniorhub.somee.com/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ offerId: offerActive?.id }),
      });

      if (!res.ok) throw new Error();

      Swal.fire("La postulacion fue exitosa !", "", "success");

      // dispatch(app)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire("Ya te has postulado a esta oferta", "", "error");
    }
    // const res = await loadOffers();

    // dispatch(setOffers(res));
  };
};

export const startSavingActiveOffer = (application: Offer) => {
  return async (dispatch: Dispatch) => {
    const token = verifyToken();
    const res = await fetch(
      `https://juniorhub.somee.com/api/offers/${application.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res", res);
    const data = await res.json();
    console.log("data", data);

    // return data.offers;

    dispatch(setActiveNote(data));
  };
};
