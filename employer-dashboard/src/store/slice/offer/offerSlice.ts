import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Applied, Offer, Technology } from "../../../@types/types";

interface offerState {
  isSaving: boolean;
  messageSaved: string;
  offers: Offer[];
  technologies: Technology[];
  offerActive: Offer | null;
}

const initialState: offerState = {
  isSaving: false,
  messageSaved: "",
  offers: [],
  technologies: [],
  offerActive: null,
};

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setSaving: (state) => {
      state.isSaving = !state.isSaving;
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<Offer>) => {
      state.offers.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Offer>) => {
      state.offerActive = action.payload;
    },
    setNotes: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setTechnologies: (state, action: PayloadAction<Technology[]>) => {
      state.technologies = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    updatedNotes: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    udpateNote: (state, action: PayloadAction<Offer>) => {
      state.offerActive = action.payload;
      state.offers = state.offers.map((offer) => {
        if (offer.id === action.payload.id) return action.payload;
        return offer;
      });
      state.isSaving = false;
    },
    deleteNoteById: (state, action: PayloadAction<number>) => {
      state.offers = state.offers.filter((note) => note.id !== action.payload);
      state.offerActive = null;
      state.isSaving = false;
    },
    setAppliedFreelancers: (state, action: PayloadAction<Applied[]>) => {
      if (state.offerActive) {
        state.offerActive.applied = action.payload;
        state.isSaving = false;
      }
    },
    selectAFreelancer: (state, action: PayloadAction<Applied[]>) => {
      if (state.offerActive) {
        state.offerActive.applied = action.payload;
        state.isSaving = false;
      }
    },
    changeValoration: (state, action: PayloadAction<number>) => {
      if (state.offerActive) {
        state.offerActive.applied[0].valoration = action.payload;
        state.isSaving = false;
      }
    },
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  udpateNote,
  deleteNoteById,
  savingNewNote,
  setTechnologies,
  setOffers,
  setAppliedFreelancers,
  selectAFreelancer,
  changeValoration,
} = offerSlice.actions;
