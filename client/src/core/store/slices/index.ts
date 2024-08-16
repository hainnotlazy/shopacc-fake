import { currentUserReducer } from "./current-user.slice";
const currentUserActions = currentUserReducer.actions;

export { fetchCurrentUser, currentUserReducer } from "./current-user.slice";
export { currentUserActions };
