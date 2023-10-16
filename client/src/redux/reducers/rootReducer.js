import { combineReducers } from "redux";
import RnasSlice from "./Rnas.slice";

export default combineReducers({
  Rna: RnasSlice,
});
