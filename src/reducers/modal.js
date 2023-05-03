import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		isOpen: false,
		modalType: "",
		modalData: {},
	},
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
			state.modalType = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.modalType = "";
		},
		saveModalData: (state, action) => {
			state.modalData = {
				...state.modalData,
				[action.payload.type]: action.payload.data,
			};
		},
		resetModalData: (state, action) => {
			delete state.modalData[action.payload];
		},
	},
});

export const { openModal, closeModal, saveModalData, resetModalData } =
	modalSlice.actions;

export default modalSlice.reducer;
