/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { startLoadingOffers, startLogin } from "../store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { verifyToken } from "../helpers/verifyToken";

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const token = verifyToken();

  useEffect(() => {
    if (token) {
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
