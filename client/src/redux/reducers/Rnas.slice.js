import { createSlice } from "@reduxjs/toolkit";

const rnaInitialState = {
  rnas: {},
};

const RnaSlice = createSlice({
  name: "Rna",
  initialState: rnaInitialState,
  reducers: {
    setRnas: (state, action) => {
      state.rnas = action.payload;
    },
  },
});

export default RnaSlice.reducer;
export const { setRnas } = RnaSlice.actions;
