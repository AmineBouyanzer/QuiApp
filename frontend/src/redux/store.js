import { configureStore } from '@reduxjs/toolkit'
import quizzReducer from './quizzSlice'

const store = configureStore({
    reducer: quizzReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export default store;