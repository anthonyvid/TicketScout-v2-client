import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
	sidebarState: true,
	user: null,
	token: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		toggleSidebarState: (state) => {
			state.sidebarState = !state.sidebarState;
		},
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setMode, toggleSidebarState, setLogin, setLogout } =
	authSlice.actions;
export default authSlice.reducer;
