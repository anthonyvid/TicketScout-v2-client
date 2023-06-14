import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        modalType: ''
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.modalType = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = '';
        },
        saveModalData: (state, action) => {
            return {
                ...state,
                [action.payload.type]: action.payload.data
            };
        },
        resetModalData: (state, action) => {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
    }
});

export const { openModal, closeModal, saveModalData, resetModalData } =
    modalSlice.actions;

export default modalSlice.reducer;
