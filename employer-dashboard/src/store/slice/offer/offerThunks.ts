import { Dispatch } from "@reduxjs/toolkit";

import Swal from "sweetalert2";
import { Applied, Offer } from "../../../@types/types";
import { loadOffers, verifyToken } from "../../../helpers";
import { loadTechnologies } from "../../../helpers/loadTechnologies";
import { RootState } from "../../store";
import {
  addNewEmptyNote,
  changeValoration,
  deleteNoteById,
  savingNewNote,
  selectAFreelancer,
  setActiveNote,
  setOffers,
  setTechnologies,
  // setUploadImages,
  udpateNote,
} from "./offerSlice";

export const startCreationOffer = () => {
  return async (dispatch: Dispatch) => {
    // const { uid } = getState().auth;
    try {
      dispatch(savingNewNote());

      const newOffer: Offer = {
        title: "New title",
        description: "Dolore minim esse culpa ullamco.",
        estimatedTime: 1,
        state: 0,
        difficult: 0,
        price: 0,
        technologies: [],
        applied: [],
      };

      const token = verifyToken();

      // console.log(newOffer);

      const res = await fetch("https://juniorhub.somee.com/api/offers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffer),
      });

      const offer = await res.json();

      if (!res.ok) throw new Error();

      const resNewOffer = {
        ...offer,
        applied: [],
      };

      dispatch(addNewEmptyNote(resNewOffer));
      dispatch(setActiveNote(resNewOffer));
    } catch (error) {
      dispatch(savingNewNote());
      console.log(error);
    }
  };
};

export const startLoadingTechnologies = () => {
  return async (dispatch: Dispatch /* getState: () => RootState */) => {
    // const { uid } = getState().auth;
    // if (!uid) throw new Error("UID is undefined");

    const res = await loadTechnologies();

    dispatch(setTechnologies(res));
  };
};

export const startLoadingOffers = () => {
  return async (dispatch: Dispatch) => {
    const res = await loadOffers();

    dispatch(setOffers(res));
  };
};

export const startUpdateOffer = ({
  title,
  description,
  price,
  estimatedTime,
  state,
  difficult,
  technologies,
}: Offer) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(savingNewNote());

      const { offerActive } = getState().offer;
      if (!offerActive) throw new Error("noteActive is empty");

      const token = verifyToken();

      const offerUpdated = {
        title,
        description,
        estimatedTime,
        state,
        difficult,
        price,
        technologies,
      };

      const res = await fetch(
        `https://juniorhub.somee.com/api/offers/${offerActive.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offerUpdated),
        }
      );

      if (!res.ok) throw new Error();
      // console.log(res);

      const data = await res.json();
      // console.log("offerUpdated", offerUpdated);
      // console.log("data", data);

      dispatch(
        udpateNote({
          id: offerActive.id,
          title: data.title,
          description: data.description,
          price: data.price,
          estimatedTime: data.estimatedTime,
          state: data.state,
          difficult: data.difficult,
          technologies: data.technologies,
          applied: offerActive.applied,
        })
      );

      Swal.fire("Actualizado", "", "success");
    } catch (error) {
      console.log(error);
    }
  };
};

export const startDeleteNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(savingNewNote());
      const { offerActive } = getState().offer;

      const token = verifyToken();
      const res = await fetch(
        `https://juniorhub.somee.com/api/offers/${offerActive?.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(res);
      if (!res.ok) throw new Error();

      Swal.fire("Eliminado", "", "success");

      dispatch(deleteNoteById(offerActive?.id as number));
    } catch (error) {
      console.log(error);
    }
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

    const data = await res.json();

    // return data.offers;

    dispatch(setActiveNote(data));
  };
};

export const startSetActiveOffer = (application: Offer) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = verifyToken();
      const res = await fetch(
        `https://juniorhub.somee.com/api/offers/${application.id}/applications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("res", res);
      const { data } = await res.json();
      // return data.offers;

      const activeOffer: Offer = {
        ...application,
        applied: data,
      };
      // console.log("activeOffer", activeOffer);

      // console.log("data", data);

      // application.applied = data;

      dispatch(setActiveNote(activeOffer));
      // dispatch(setAppliedFreelancers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSelectFreelancer = (offerId: number, freelancer: Applied) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (_dispatch: Dispatch) => {
    try {
      const token = verifyToken();
      const res = await fetch(
        `https://juniorhub.somee.com/api/offers/${offerId}/applications/${freelancer.id}/select`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();
      // console.log("res", res);
      // const data = await res.json();
      // console.log("data", data);
      // return data.offers;
      // const activeOffer: Offer = {
      //   ...application,
      //   applied: data,
      // };

      const freelancerSelected: Applied[] = [];
      freelancerSelected.push(freelancer);

      selectAFreelancer(freelancerSelected);
      Swal.fire("La seleccion del freelancer fue exitosa", "", "success");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire("Hubo un error al seleccionar al freelancer", "", "error");
    }
  };
};

export const startChangeValoration = (newValoration: number) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const token = verifyToken();

      const { offerActive } = getState().offer;

      const valoration = {
        freelancerId: offerActive?.applied[0].id,
        valorationValue: newValoration - 1,
      };

      // console.log(valoration);

      const res = await fetch(
        `https://juniorhub.somee.com/api/freelancervalorations`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valoration),
        }
      );

      if (!res.ok) throw new Error();
      // console.log("res", res);
      const { data } = await res.json();
      // console.log("data", data);

      dispatch(changeValoration(data.valorationValue));
      Swal.fire("La valoracion fue exitosa !", "", "success");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire("Ya has valorado a este usuario", "", "error");
    }
  };
};
