import { User } from "@/core/models";
import { CookiesService, UsersService } from "@/services";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
	fetched: boolean;
	user: User | null;
} = {
	fetched: false,
	user: null,
};

export const currentUserReducer = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
			state.fetched = true;
			state.user = action.payload;
		});
	},
});

export const fetchCurrentUser = createAsyncThunk("currentUser/fetchCurrentUser", async () => {
	if (CookiesService.hasAccessToken()) {
		const user = await UsersService.getCurrentUser();
		return user;
	}
	return null;
});
