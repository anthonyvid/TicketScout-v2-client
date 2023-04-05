import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	organization: {},
	customers: {},
	tickets: {},
	payments: {},
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
		setCustomers: (state, action) => {
			state.customers = action.payload.customers;
		},
		setPayments: (state, action) => {
			state.payments = action.payload.payments;
		},
	},
});

export const { setOrganization, setTickets, setCustomers, setPayments } =
	resourceSlice.actions;
export default resourceSlice.reducer;
