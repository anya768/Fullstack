import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    message: null,
    display: false
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        resetNotification(state, action) {
            return {
                message: null,
                display: false
            }
        },
        showNotification(state, action) {
            return {
                message: action.payload,
                display: true
            }
        }
    },
})

export const { resetNotification, showNotification } = notificationSlice.actions
export default notificationSlice.reducer