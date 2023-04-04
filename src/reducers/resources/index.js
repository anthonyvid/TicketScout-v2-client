import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	organization: null,
	customers: null,
	tickets: null,
	payments: null,
};

export const resourceSlice = createSlice({
	name: "resources",
	initialState,
	reducers: {
		setOrganization: (state, action) => {
			state.organization = action.payload.organization;
		},
		setTickets: (state, action) => {
			state.tickets = action.payload.tickets;
		},
	},
});

export const { setOrganization, setTickets } = resourceSlice.actions;
export default resourceSlice.reducer;
