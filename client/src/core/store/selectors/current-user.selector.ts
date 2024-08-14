import { User } from "@/core/models";
import { RootState } from "../store";

export const currentUserSelector = (state: RootState): User | null => state.currentUser.user;
export const fetchedCurrentUserSelector = (state: RootState): boolean => state.currentUser.fetched;
