import rootReducer from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export default store;
