import { createSlice } from "@reduxjs/toolkit"


const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        notification: false,
        cartIsVisible: false,
    },
    reducers: {
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        },
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible
        }
    }
});

export const uiAction = uiSlice.actions;
export default uiSlice;