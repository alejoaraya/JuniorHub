/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  startLoadingOffers,
  startLoadingTechnologies,
  startLogin,
} from "../store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { verifyToken } from "../helpers";

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = verifyToken();

    if (token) {
      dispatch(startLoadingTechnologies());
      dispatch(startLoadingOffers());
    }
    dispatch(startLogin());

    // onAuthStateChanged(FirebaseAuth, async (user) => {
    //   if (!user) return dispatch(logout(""));

    //   const { displayName, email, photoURL, uid } = user;
    //   // dispatch(startLoadingNotes());
    // });
  }, []);

  return status;
};
