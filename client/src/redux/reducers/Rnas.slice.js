import { createSlice } from "@reduxjs/toolkit";

const rnaInitialState = {
  rnas: {},
};

const RnaSlice = createSlice({
  name: "Rna",
  initialState: rnaInitialState,
  reducers: {
    setRnas: (state, action) => {
      state.rnas = { ...action.payload };
    },
    getRnaById: (state, action) => {
      console.log("action payload get id", action.payload);
      const id = action.payload.id;
      let foundRna;
      for (const rna in state.rnas) {
        rna.id === id ? (foundRna = rna) : "";
      }
      return foundRna;
    },
  },
});

export default RnaSlice.reducer;
export const { setRnas, getRnaById } = RnaSlice.actions;
