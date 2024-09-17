import { Dispatch } from "@reduxjs/toolkit";
import { loadOffers } from "../../../helpers";
import { setOffers } from "../offer";

export const startSearchingGetAll = (querySearch = "") => {
  return async (dispatch: Dispatch) => {
    const offers = await loadOffers(querySearch);

    dispatch(setOffers(offers));
  };
};
