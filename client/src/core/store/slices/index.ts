import { currentUserReducer, fetchCurrentUser } from "./current-user.slice";
const currentUserActions = currentUserReducer.actions;

// Current User Reducers & Actions
export { fetchCurrentUser, currentUserReducer, currentUserActions };
