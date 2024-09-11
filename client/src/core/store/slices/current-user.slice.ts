import { User } from "@/core/models";
import { CookiesService, UsersService } from "@/services";
import cookiesService, { AuthTokenType } from "@/services/cookies.service";
import profileService from "@/services/profile.service";
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
		setCurrentUser: (state, action: PayloadAction<User | null>) => {
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
			})
			.addCase(logCurrentUserOut.pending, state => {
				state.fetched = false;
			})
			.addCase(logCurrentUserOut.fulfilled, (state, action) => {
				state.user = action.payload;
				state.fetched = true;
			})
			.addCase(logCurrentUserOut.rejected, state => {
				state.fetched = true;
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

export const logCurrentUserOut = createAsyncThunk("currentUser/logout", async () => {
	CookiesService.clearToken(AuthTokenType.ACCESS_TOKEN);
	CookiesService.clearToken(AuthTokenType.REFRESH_TOKEN);

	return null;
});

export const updateUseDarkMode = createAsyncThunk(
	"currentUser/updateUseDarkMode",
	async (useDarkMode: boolean) => {
		if (cookiesService.hasAccessToken()) {
			const user = await profileService.toggleDarkMode(useDarkMode);
			return user;
		}
		return null;
	},
);
