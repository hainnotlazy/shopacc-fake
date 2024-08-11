import { RootStateSelectors } from "reselect";

export const currentUserSelector = (state: RootStateSelectors) => state.currentUser;
