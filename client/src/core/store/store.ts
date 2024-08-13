import { configureStore } from "@reduxjs/toolkit";
import { currentUserReducer } from "./slices";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		currentUser: currentUserReducer.reducer,
	},
	devTools: true,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
