import { User } from "@/core/models";
import { CookiesService, UsersService } from "@/services";
import cookiesService from "@/services/cookies.service";
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
		setFetchedUser: (state, action: PayloadAction<boolean>) => {
			state.fetched = action.payload;
		},
		updateCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
			!!state.user && Object.assign(state.user, action.payload);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCurrentUser.pending, state => {
				state.fetched = false;
				state.user = null;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.fetched = true;
				state.user = action.payload;
			})
			.addCase(fetchCurrentUser.rejected, state => {
				state.fetched = true;
				state.user = null;
			})
			.addCase(updateUseDarkMode.fulfilled, (state, action) => {
				!!state.user && Object.assign(state.user, action.payload);
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

export const updateUseDarkMode = createAsyncThunk(
	"currentUser/updateUseDarkMode",
	async (useDarkMode: boolean) => {
		if (cookiesService.hasAccessToken()) {
			const user = await UsersService.updateCurrentUser({ useDarkMode });
			return user;
		}
		return null;
	},
);
