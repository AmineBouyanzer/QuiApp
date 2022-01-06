import { createSlice } from '@reduxjs/toolkit'

export const quizzSlice = createSlice({
    name: "quizzReducer",
    initialState: {
        name: ""
    },
    reducers: {
        setName: (state, name) => {
            state.name = name.payload
        }
    },
})

export const quizzActions  = quizzSlice.actions

export default quizzSlice.reducer